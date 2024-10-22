/** 
 * Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */
 
variable "additional_tags" {
  default = {
    "Ambiente"            = "Producción"
    "AnalistaResponsable" = "@author@"
    "Compania"            = "@company@"
    "LiderProyecto"       = "@author@"
    "NombreProyecto"      = "@appName@-PROD"
    "IaC"                 = "Terraform"
  }
  description = "Additional resource tags"
  type        = map(string)
}

variable "stage" {
  default     = "prod"
  description = "stage app"
  type        = string
}