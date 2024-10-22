/** 
 * Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

output "repository_url" {
  value = aws_ecr_repository.@appname@_app_ecr_repo.repository_url
}