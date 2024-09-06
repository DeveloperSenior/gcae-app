/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

locals {

  ecr_repo_name = "gcae-apiservices-${var.stage}"

  gcae_app_cluster_name        = "gcae-app-cluster-${var.stage}"
  availability_zones           = ["us-east-1a", "us-east-1b", "us-east-1c"]
  gcae_app_task_famliy         = "gcae-app-task-${var.stage}"
  container_port               = 3000
  gcae_app_task_name           = "gcae-app-task-${var.stage}"
  ecs_task_execution_role_name = "gcae-app-task-execution-role"

  application_load_balancer_name = "cc-gcae-app-alb-${var.stage}"
  target_group_name              = "cc-gcae-alb-tg"

  gcae_app_service_name = "cc-gcae-app-service-${var.stage}"

  additional_tags = var.additional_tags

}