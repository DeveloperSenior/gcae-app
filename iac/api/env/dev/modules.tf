data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

module "ECS-Gcae-API" {
  source = "../../module/aws"
  additional_tags = var.additional_tags
  vpc_id=var.vpc_id
  ecs_name="ambiente-gcae-api-dllo"
  ecs_task_name = "gcae-apiTsk"
  ecs_task_container_name="gcae-apisrv"
  ecs_task_image_name="${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/gecae-api:betaTest"
  ecs_task_cpu=408
  ecs_task_memory=1024
  ecs_task_awslogs_group="/ecs/gcae-apiTsk"
  ecs_task_awslogs_region=data.aws_region.current.name
  ecs_task_awslogs_stream_prefix="ecs"
  ecs_portMappings= [
        {
          protocol      = "tcp"
          containerPort = 7380
          hostPort      = 0
        }
  ]
  ecs_service_name="gcae-apidllo-services"
  ecs_number_of_tasks="1"
  #ecs_load_balancer  = var.ecs_load_balancer
  #ecs_dns_namespace="local"
  ecs_service_discovery_name="gcae-apidllo-services"
  ecr_name="gcae-apiservices"
  ecs_service_registries  = {
    "rule1" = {
          ecs_container_name="gcae-apisrv"
          ecs_container_port="7380"
     }
  } 
  ecs_ec2_name_prefix = "gcae-apidllo-"
  ecs_cp_name = "gcae-apidllo"
}
