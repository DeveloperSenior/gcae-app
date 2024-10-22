/** 
 * Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

terraform {

  backend "s3" {
    bucket = "@appname@-state-backend-terraform"
    key    = "state/qa/@appname@-api/terraform.tfstate"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

}

module "CloudWatch-Logs-groups" {
  source                = "../shared/modules/cloudwatch"
  cloudwatch_logs_group = local.cloudwatch_logs_group
  additional_tags       = local.additional_tags
}

module "ECR-Repository" {
  source          = "../shared/modules/ecr"
  ecr_repo_name   = local.ecr_repo_name
  additional_tags = local.additional_tags
}

module "ECS-Cluster" {
  source = "../shared/modules/ecs"

  @appname@_app_cluster_name = local.@appname@_app_cluster_name
  availability_zones    = local.availability_zones

  @appname@_app_task_famliy         = local.@appname@_app_task_famliy
  @appname@_app_task_memory         = local.@appname@_app_task_memory
  @appname@_app_task_cpu            = local.@appname@_app_task_cpu
  ecr_repo_url                 = module.ECR-Repository.repository_url
  container_port               = local.container_port
  @appname@_app_task_name           = local.@appname@_app_task_name
  ecs_task_execution_role_name = local.ecs_task_execution_role_name

  application_load_balancer_name = local.application_load_balancer_name
  target_group_name              = local.target_group_name
  @appname@_app_service_name          = local.@appname@_app_service_name
  @appname@_app_service_network_mode  = local.@appname@_app_service_network_mode
  @appname@_app_service_launch_type   = local.@appname@_app_service_launch_type

  @appname@_app_awslogs_group         = local.cloudwatch_logs_group
  @appname@_app_awslogs_region        = data.aws_region.current.name
  @appname@_app_awslogs_stream_prefix = local.cloudwatch_logs_stream_prefix

  additional_tags = local.additional_tags

}