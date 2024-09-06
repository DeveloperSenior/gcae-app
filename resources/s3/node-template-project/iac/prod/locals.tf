/** 
 * Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

locals {

  cloudwatch_logs_group         = "/ecs/@appname@-app-${var.stage}"
  cloudwatch_logs_stream_prefix = "ecs"

  ecr_repo_name = "@appname@-apiservices-${var.stage}"

  gcae_app_cluster_name        = "@appname@-app-cluster-${var.stage}"
  availability_zones           = ["us-east-1a", "us-east-1b", "us-east-1c"]
  gcae_app_task_famliy         = "@appname@-app-task-${var.stage}"
  gcae_app_task_memory         = 1024
  gcae_app_task_cpu            = 256
  container_port               = @appPort@
  gcae_app_task_name           = "@appname@-app-task-${var.stage}"
  ecs_task_execution_role_name = "@appname@-app-task-execution-role"

  application_load_balancer_name = "cc-@appname@-app-alb-${var.stage}"
  target_group_name              = "cc-@appname@-alb-tg"

  gcae_app_service_name         = "cc-@appname@-app-service-${var.stage}"
  gcae_app_service_network_mode = "awsvpc"
  gcae_app_service_launch_type  = "FARGATE"

  additional_tags = var.additional_tags

}