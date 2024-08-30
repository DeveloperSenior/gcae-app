variable "additional_tags" {
  default     = {}
  description = "Additional resource tags"
  type        = map(string)
}

variable "ecs_task_name" {
  description = "Id de la VPC"
  type        = string
}


variable "ecs_name" {
  description = "Id de la VPC"
  type        = string
}

variable "ecs_task_container_name" {
  description = "Nombre del contenedor"
  type        = string
}

variable "ecs_task_image_name" {
  description = "Nombre de la imagen"
  type        = string
}

variable "ecs_task_cpu" {
  description = "Cantidad de CPU"
  type        = number
}

variable "ecs_task_memory" {
  description = "Cantidad de memoria"
  type        = number
}

variable "ecs_task_awslogs_group" {
  description = "Grupo de logs"
  type        = string
}

variable "ecs_task_awslogs_region" {
  description = "Region de grupo de logs"
  type        = string
}

variable "ecs_task_awslogs_stream_prefix" {
  description = "Prefijo de grupo de logs"
  type        = string
}

variable "ecs_service_name" {
  description = "Nombre del servicio"
  type        = string
}

variable "ecs_number_of_tasks" {
  description = "Numero de tareas"
  type        = string
}

variable "ecs_dns_namespace" {
  default     = ""
  description = "DNS Namespace"
  type        = string
}

variable "ecs_dns_record_type" {
  default     = ""
  description = "DNS Record type"
  type        = string
}

variable "ecs_service_discovery_name" {
  default     = ""
  description = "Nombre discovery service"
  type        = string
}

variable "vpc_id" {
  description = "Id de la VPC"
  type        = string
}

variable "ecr_name" {
  description = "Nombre ECR"
  type        = string
}

variable "ecs_env_variables" {
  default     = []
  description = "Variables ECS"
}

variable "ecs_load_balancer" {
  default     = {}
  description = "Load Balancer"
  type = map(object({
    ecs_load_balancer_name = string
    ecs_container_name     = string
    ecs_container_port     = string
  }))
}

variable "ecs_service_registries" {
  default     = {}
  description = "Services Registries"
  type = map(object({
    ecs_container_name = string
    ecs_container_port = string
  }))
}

variable "ecs_portMappings" {
  description = "Port Mappings"
  type        = any
  default     = []
}

variable "ecs_command" {
  description = "Command"
  type        = any
  default     = []
}


variable "ecs_ordered_placement_strategy" {
  default     = {}
  description = "Ordered placement Strategies"
  type = map(object({
    type  = string
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

variable "ecs_network_mode" {
    default = ""
    description = "Network mode"
    type = string
}

variable "ecs_ec2_instance_type" {
    default = "t2.small" // AWS Free level (i386, x86_64, vCPU 1, 1GB Memory)
    description = "ECS type Instance EC2"
    type = string
}

variable "ecs_ec2_name_prefix" {
    default = "demo-ecs-ec2-"
    description = "ECS name prefix EC2"
    type = string
}

variable "ecs_cp_name" {
    default = "demo-ecs-ec2"
    description = "ECS name capacity provider EC2"
    type = string
}

variable "ecs_vpc_cidr_block" {
    description = "ECS cidr block VPC config"
    type = string
}

variable "ecs_securiry_group_prefix" {
  description = "ECS security group prefix name"
  type = string
}

variable "ecs_securiry_group_egress_cidr_block" {
  default = []
  description = "ECS security group egress config cidr block"
  type = list(string)
}

variable "ecs_securiry_group_egress_protocol" {
  default = ""
  description = "ECS security group egress config protocol"
  type = string
}

variable "ecs_securiry_group_egress_from_port" {
  default = 0
  description = "ECS security group egress config from port"
  type = number
}

variable "ecs_securiry_group_egress_to_port" {
  default = 0
  description = "ECS security group egress config to port"
  type = number
}

variable "ecs_route_table_cidr_block" {
  default = ""
  description = "ECS cidr block route table config"
  type = string
}

variable "ecs_ami" {
  default = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
  description = "ECS config Amazon Machine Image (AMI) template"
  type = string
}

variable "ecs_autoscaling_group_min_size" {
  default = 1
  description = "ECS autoscaling group config min size"
  type = number
}

variable "ecs_autoscaling_group_max_size" {
  default = 2
  description = "ECS autoscaling group config max size"
  type = number
}

variable "ecs_iam_task_role_name_prefix" {
  description = "ECS config Identity and Access Management (IAM) task role name"
  type = string
}

variable "ecs_iam_exec_role_name_prefix" {
  description = "ECS config Identity and Access Management (IAM) execute role name"
  type = string
}

variable "ecs_iam_role_name_prefix" {
  description = "ECS config Identity and Access Management (IAM) role name prefix"
  type = string
}

variable "ecs_iam_instance_profile_name_prefix" {
  description = "ECS config Identity and Access Management (IAM) instance profile name prefix"
  type = string
}
