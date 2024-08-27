data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

module "ECS-Gcae-API" {
  source                         = "../../../shared/modules/aws/ecs"
  additional_tags                = var.additional_tags
  vpc_id                         = var.vpc_id
  ecs_name                       = var.ecs_name
  ecs_task_name                  = var.ecs_task_name
  ecs_task_container_name        = var.ecs_task_container_name
  ecs_task_image_name            = var.ecs_task_image_name
  ecs_task_cpu                   = var.ecs_task_cpu
  ecs_task_memory                = var.ecs_task_memory
  ecs_task_awslogs_group         = var.ecs_task_awslogs_group
  ecs_task_awslogs_region        = var.ecs_task_awslogs_region
  ecs_task_awslogs_stream_prefix = var.ecs_task_awslogs_stream_prefix
  ecs_service_name               = var.ecs_service_name
  ecs_number_of_tasks            = var.ecs_number_of_tasks
  ecs_task_role_arn              = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/AWSRoleForECS"
  ecs_env_variables              = var.ecs_env_variables
  ecr_name                       = var.ecr_name
  ecs_require_compatibilities    = "EC2"
  ecs_portMappings               = var.ecs_portMappings
  ecs_command                    = var.ecs_command
  ecs_ordered_placement_strategy = {
    "rule1" = {
      type  = "spread"
      field = "attribute:ecs.availability-zone"
    },
    "rule2" = {
      type  = "spread"
      field = "instanceId"
    }
  }
  ecs_network_configuration              = var.ecs_network_configuration
  ecs_deployment_maximum_percent         = 100
  ecs_deployment_minimum_healthy_percent = 0
  #ecs_load_balancer              = var.ecs_load_balancer
  #ecs_dns_namespace              = var.ecs_dns_namespace
  #ecs_service_discovery_name     = var.ecs_service_discovery_name
  #ecs_dns_record_type                    = "SRV"
  ecs_service_registries                 = var.ecs_service_registries
  ecs_ec2_instance_type = var.ecs_ec2_instance_type
  ecs_ec2_name_prefix = var.ecs_ec2_name_prefix
  ecs_cp_name = var.ecs_cp_name
  ecs_asg_vpc_zone_identifier = var.ecs_asg_vpc_zone_identifier
}


