variable "additional_tags" {
   default = {}
   description = "Additional resource tag"
   type = map(string)
}

variable "aws_vpc_cidr_block" {
   description = "VPC cdir block IP"
   type = string
}

variable "aws_route_table_cidr_block" {
   default = "0.0.0.0/0"
   description = "Route table cdir block IP"
   type = string  
  
}