resource "aws_cloudwatch_log_group" "service" {
  name = var.ecs_task_awslogs_group
  tags = var.additional_tags

}

resource "aws_ecs_cluster" "ecs" {
  tags = var.additional_tags
  name=var.ecs_name
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
 task_role_arn=var.ecs_task_role_arn
 execution_role_arn=var.ecs_execution_role_arn !=""?var.ecs_execution_role_arn:null
 network_mode=var.ecs_network_mode!=""?var.ecs_network_mode:null
 requires_compatibilities = [
          var.ecs_require_compatibilities
        ]
}

# --- ECS Launch Template ---

data "aws_ssm_parameter" "ecs_node_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

resource "aws_launch_template" "ecs_ec2" {
  name_prefix            = var.ecs_ec2_name_prefix
  image_id               = data.aws_ssm_parameter.ecs_node_ami.value
  instance_type          = var.ecs_ec2_instance_type

  //iam_instance_profile { arn = aws_iam_instance_profile.ecs_node.arn }
  monitoring { enabled = true }

  user_data = base64encode(<<-EOF
      #!/bin/bash
      echo ECS_CLUSTER=${aws_ecs_cluster.ecs.name} >> /etc/ecs/ecs.config;
    EOF
  )

  tags = var.additional_tags
}

# --- ECS ASG ---

resource "aws_autoscaling_group" "ecs" {
  name_prefix               = var.ecs_asg_name_prefix
  vpc_zone_identifier       = var.ecs_asg_vpc_zone_identifier
  min_size                  = 1
  max_size                  = 2
  health_check_grace_period = 0
  health_check_type         = "EC2"
  protect_from_scale_in     = false

  launch_template {
    id      = aws_launch_template.ecs_ec2.id
    version = "$Latest"
  }

}

# --- ECS Capacity Provider ---

resource "aws_ecs_capacity_provider" "main" {
  name = var.ecs_cp_name

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs.arn
    managed_termination_protection = "DISABLED"

    managed_scaling {
      maximum_scaling_step_size = 2
      minimum_scaling_step_size = 1
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

resource "aws_ecs_service" "service" {
  name            = var.ecs_service_name
  cluster         = aws_ecs_cluster.ecs.id
  task_definition = aws_ecs_task_definition.service.arn
  desired_count   = var.ecs_number_of_tasks
  enable_ecs_managed_tags= true
  deployment_maximum_percent = var.ecs_deployment_maximum_percent
  deployment_minimum_healthy_percent = var.ecs_deployment_minimum_healthy_percent
  launch_type=var.ecs_require_compatibilities

  dynamic "network_configuration" {
    iterator = ncvar
    for_each = var.ecs_network_configuration
    content {
      assign_public_ip = ncvar.value.assign_public_ip
      security_groups   = ncvar.value.security_groups
      subnets   = ncvar.value.subnets

    }
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

resource "aws_ecr_repository" "repositorio" {
  name                 = var.ecr_name
  tags = var.additional_tags
  image_tag_mutability = "MUTABLE"
}