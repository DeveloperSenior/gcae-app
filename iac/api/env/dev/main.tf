provider "aws" {
  region  = "us-east-1"
}

terraform {
  
  backend "s3" {
    bucket = "gcae-state-backend-terraform"
    key    = "state/dev/gcae-api/terraform.tfstate"
    region = "us-east-1"
  }
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
