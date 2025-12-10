terraform {
  backend "s3" {
    bucket         = "employees-app-terraform-state"
    key            = "employees-app/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock-table"
  }
}