variable "additional_tags" {
   default = {}
   description = "Additional resource tag"
   type = map(string)
}

variable "ecs_task_name" {
    description = "Task Name"
    type = string
}

variable "ecs_name" {
    description = "ECS Name"
    type = string
}

variable "ecs_task_container_name" {
    description = "Container Name"
    type = string
}

variable "ecs_task_image_name" {
    description = "Image Name"
    type = string
}

variable "ecs_task_cpu" {
    description = "CPU count"
    type = number
}

variable "ecs_task_memory" {
    description = "Memory count"
    type = number
}

variable "ecs_task_awslogs_group" {
    description = "Logs group"
    type = string
}

variable "ecs_task_awslogs_region" {
    description = "Region logs group"
    type = string
}

variable "ecs_task_awslogs_stream_prefix" {
    description = "Prefix region logs group"
    type = string
}

variable "ecs_service_name" {
    description = "Service name"
    type = string
}

variable "ecs_number_of_tasks" {
    description = "Number of task"
    type = string
}

variable "ecs_dns_namespace" {
    default = ""
    description = "DNS Namespace"
    type = string
}

variable "ecs_dns_record_type" {
    default = ""
    description = "DNS record type"
    type = string
}

variable "ecs_service_discovery_name" {
    default = ""
    description = "Service discovery name"
    type = string
}

variable "vpc_id" {
    description = "VPC id"
    type = string
}

variable "ecr_name" {
    description = "ERC Name"
    type = string
}

variable "ecs_task_role_arn" {
    description = "ARN Rol ECS"
    type = string
}

variable "ecs_execution_role_arn" {
    default = ""
    description = "ARN execution Rol ECS"
    type = string
}

variable "ecs_env_variables" {
    default = []
    description = "Variable ECS"
}

variable "ecs_load_balancer" {
    default = {}
    description = "Load balancer"
    type = map(object({
        ecs_load_balancer_name = string
        ecs_container_name = string
        ecs_container_port = string
    }))
}

variable "ecs_service_registries" {
    default = {}
    description = "Services registries"
    type = map(object({
        ecs_container_name = string
        ecs_container_port = string
    }))
}

variable "ecs_require_compatibilities" {
    description = "ECS compatibilities"
    type = string
}

variable "ecs_portMappings" {
    description = "Port Mappings"
    type = any
    default = []
}

variable "ecs_command" {
    description = "Command"
    type = any
    default = []
}

variable "ecs_network_mode" {
    default = ""
    description = "Network mode"
    type = string
}

variable "ecs_ordered_placement_strategy" {
  default = {}
  description = "Ordered placement strategy"
  type = map(object({
        type = string
        field = string
    }))
}

variable "ecs_network_configuration" {
  default = {}
  description = "network configuration"
  type = map(object({
    assign_public_ip = string
    security_groups = list(string)
    subnets = list(string)
  }))
}

variable "ecs_deployment_maximum_percent" {
    default = ""
    description = "ECS deployment maximum percent"
    type = string
}

variable "ecs_deployment_minimum_healthy_percent" {
    default = ""
    description = "ECS deployment inimum healthy percent"
    type = string
}

variable "ecs_ec2_instance_type" {
    default = "t2.micro" // AWS Free level (i386, x86_64, vCPU 1, 1GB Memory)
    description = "ECS type Instance EC2"
    type = string
}

variable "ecs_ec2_name_prefix" {
    default = "demo-ecs-ec2-"
    description = "ECS name prefix EC2"
    type = string
}

variable "ecs_asg_name_prefix" {
    default = "demo-ecs-asg-"
    description = "Autoscaling group name prefix ECS"
    type = string
}

variable "ecs_cp_name" {
    default = "demo-ecs-ec2"
    description = "ECS name capacity provider EC2"
    type = string
}