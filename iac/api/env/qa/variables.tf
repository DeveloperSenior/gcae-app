variable "additional_tags" {
  default     = {
    "Ambiente" = "Producción"
    "AnalistaResponsable" = "Andres Felipe Escobar Lopez"
    "Compania" = "Tecnologico de Antioquia"
    "LiderProyecto" = "Andres Felipe Escobar Lopez"
    "NombreProyecto" = "GCAE-PDN"
    "IaC" = "Terraform"
  }
  description = "Additional resource tags"
  type        = map(string)
}

variable "vpc_id" {
  default = ""
  description = "Id de la VPC"
  type = string
}

variable "ecs_load_balancer" {
  default = {}
  description = "Load Balancer"
  type = map(object({
    ecs_load_balancer_name = string
    ecs_container_name = string
    ecs_container_port= string
  }))
}


