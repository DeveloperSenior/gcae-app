# --- VPC ---

data "aws_availability_zones" "available" { state = "available" }

locals {
  azs_count = 2
  azs_names = data.aws_availability_zones.available.names
}

resource "aws_vpc" "main" {
  cidr_block           = var.ecs_vpc_cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags                 = var.additional_tags
}

resource "aws_subnet" "public" {
  count                   = local.azs_count
  vpc_id                  = aws_vpc.main.id
  availability_zone       = local.azs_names[count.index]
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, 10 + count.index)
  map_public_ip_on_launch = true
  tags                    = var.additional_tags
}

# --- Internet Gateway ---

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = var.additional_tags
}

resource "aws_eip" "main" {
  count      = local.azs_count
  depends_on = [aws_internet_gateway.main]
  tags       = var.additional_tags
}

# --- Public Route Table ---

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  tags   = var.additional_tags

  route {
    cidr_block = var.ecs_route_table_cidr_block
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public" {
  count          = local.azs_count
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# --- ECS Cluster ---
resource "aws_ecs_cluster" "ecs" {
  tags = var.additional_tags
  name=var.ecs_name
}

# --- ECS Node Role ---

data "aws_iam_policy_document" "ecs_node_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_node_role" {
  name_prefix        = var.ecs_iam_role_name_prefix
  assume_role_policy = data.aws_iam_policy_document.ecs_node_doc.json
}

resource "aws_iam_role_policy_attachment" "ecs_node_role_policy" {
  role       = aws_iam_role.ecs_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_node" {
  name_prefix = var.ecs_iam_instance_profile_name_prefix
  path        = "/ecs/instance/"
  role        = aws_iam_role.ecs_node_role.name
}

# --- ECS Node SG ---

resource "aws_security_group" "ecs_node_sg" {
  name_prefix = var.ecs_securiry_group_prefix
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = var.ecs_securiry_group_egress_from_port
    to_port     = var.ecs_securiry_group_egress_to_port
    protocol    = var.ecs_securiry_group_egress_protocol
    cidr_blocks = var.ecs_securiry_group_egress_cidr_block
  }
}

# --- ECS Launch Template ---

data "aws_ssm_parameter" "ecs_node_ami" {
  name = var.ecs_ami
}

resource "aws_launch_template" "ecs_ec2" {
  name_prefix            = var.ecs_ec2_name_prefix
  image_id               = data.aws_ssm_parameter.ecs_node_ami.value
  instance_type          = var.ecs_ec2_instance_type
  vpc_security_group_ids = [aws_security_group.ecs_node_sg.id]

  iam_instance_profile { arn = aws_iam_instance_profile.ecs_node.arn }
  monitoring { enabled = true }

  user_data = base64encode(<<-EOF
      #!/bin/bash
      echo "ECS_CLUSTER=${aws_ecs_cluster.ecs.name}" >> /etc/ecs/ecs.config;
    EOF
  )

  tags = var.additional_tags
}

# --- ECS ASG ---
resource "aws_autoscaling_group" "ecs" {
  name_prefix               = var.ecs_asg_name_prefix
  vpc_zone_identifier       = aws_subnet.public[*].id
  min_size                  = var.ecs_autoscaling_group_min_size
  max_size                  = var.ecs_autoscaling_group_max_size
  health_check_grace_period = 0
  health_check_type         = "EC2"
  protect_from_scale_in     = false

  launch_template {
    id      = aws_launch_template.ecs_ec2.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = ""
    propagate_at_launch = true
  }

}


# --- ECS Capacity Provider ---

resource "aws_ecs_capacity_provider" "main" {
  name = var.ecs_cp_name

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs.arn
    managed_termination_protection = "DISABLED"

    managed_scaling {
      maximum_scaling_step_size = var.ecs_autoscaling_group_max_size
      minimum_scaling_step_size = var.ecs_autoscaling_group_min_size
      status                    = "ENABLED"
      target_capacity           = 100
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "main" {
  cluster_name       = aws_ecs_cluster.ecs.name
  capacity_providers = [aws_ecs_capacity_provider.main.name]

  default_capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.main.name
    base              = 1
    weight            = 100
  }
}

# --- ECR ---
resource "aws_ecr_repository" "repositorio" {
  name                 = var.ecr_name
  tags = var.additional_tags
  image_tag_mutability = "MUTABLE"
  force_delete         = true
  image_scanning_configuration {
    scan_on_push = true
  }
}

# --- ECS Task Role ---

data "aws_iam_policy_document" "ecs_task_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task_role" {
  name_prefix        = var.ecs_iam_task_role_name_prefix
  assume_role_policy = data.aws_iam_policy_document.ecs_task_doc.json
}

resource "aws_iam_role" "ecs_exec_role" {
  name_prefix        = var.ecs_iam_exec_role_name_prefix
  assume_role_policy = data.aws_iam_policy_document.ecs_task_doc.json
}

resource "aws_iam_role_policy_attachment" "ecs_exec_role_policy" {
  role       = aws_iam_role.ecs_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "service" {
  name = var.ecs_task_awslogs_group
  retention_in_days = 14
  tags = var.additional_tags
}

resource "aws_ecs_task_definition" "service" {
  family = var.ecs_task_name
  tags = var.additional_tags
  container_definitions = jsonencode([
    {
      name      = var.ecs_task_container_name
      image     = var.ecs_task_image_name
      cpu       = var.ecs_task_cpu
      memory    = var.ecs_task_memory
      command=length(var.ecs_command)==0?null:var.ecs_command
      memoryReservation= 256
      essential = true
      environment = var.ecs_env_variables
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group = var.ecs_task_awslogs_group
          awslogs-region = var.ecs_task_awslogs_region
          awslogs-stream-prefix = var.ecs_task_awslogs_stream_prefix
        }
      }
      portMappings = var.ecs_portMappings
    }
  ])
 cpu       = var.ecs_task_cpu
 memory    = var.ecs_task_memory
 task_role_arn      = aws_iam_role.ecs_task_role.arn
 execution_role_arn = aws_iam_role.ecs_exec_role.arn
 network_mode=var.ecs_network_mode!=""?var.ecs_network_mode:null
 requires_compatibilities = [
          var.ecs_require_compatibilities
        ]
}

/* resource "aws_service_discovery_private_dns_namespace" "namespace" {
  count       = var.ecs_dns_namespace!= ""?1:0
  name        = var.ecs_dns_namespace
  vpc         = var.vpc_id
} */

/* resource "aws_service_discovery_service" "discovery_service" {
 count       = var.ecs_dns_namespace!= ""?1:0
 name = var.ecs_service_discovery_name

 dns_config {
   namespace_id = aws_service_discovery_private_dns_namespace.namespace[0].id

   dns_records {
     ttl  = 60
     type = var.ecs_dns_record_type
   }

}

 health_check_custom_config {
   failure_threshold = 1
 }
} */


# --- ECS Service ---

resource "aws_security_group" "ecs_task" {
  name_prefix = "ecs-task-sg-"
  description = "Allow all traffic within the VPC"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_service" "service" {
  name            = var.ecs_service_name
  cluster         = aws_ecs_cluster.ecs.id
  task_definition = aws_ecs_task_definition.service.arn
  desired_count   = var.ecs_number_of_tasks
  enable_ecs_managed_tags= true
  deployment_maximum_percent = var.ecs_deployment_maximum_percent
  deployment_minimum_healthy_percent = var.ecs_deployment_minimum_healthy_percent
  tags = var.additional_tags
  #launch_type=var.ecs_require_compatibilities

  /*dynamic "network_configuration" {
    iterator = ncvar
    for_each = var.ecs_network_configuration
    content {
      assign_public_ip = ncvar.value.assign_public_ip
      security_groups   = ncvar.value.security_groups
      subnets   = ncvar.value.subnets

    }
  }*/
  network_configuration {
    security_groups = [aws_security_group.ecs_task.id]
    subnets         = aws_subnet.public[*].id
  }

  dynamic "ordered_placement_strategy" {
    iterator = opsvar
    for_each = var.ecs_ordered_placement_strategy
    content {
      type = opsvar.value.type
      field   = opsvar.value.field
    }
  }

  dynamic "load_balancer" {
    iterator = lbvar
    for_each = var.ecs_load_balancer
    content {
      target_group_arn = lbvar.value.ecs_load_balancer_name
      container_name   = lbvar.value.ecs_container_name
      container_port  = lbvar.value.ecs_container_port
    }
  }

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.main.name
    base              = 1
    weight            = 100
  }

  /*dynamic "service_registries" {
    iterator = srvar
    for_each = var.ecs_service_registries
    content {
      registry_arn=aws_service_discovery_service.discovery_service[0].arn
      container_name=srvar.value.ecs_container_name
      container_port=srvar.value.ecs_container_port
    }
  }*/

}
