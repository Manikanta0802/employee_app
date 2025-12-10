terraform {
  backend "s3" {
    bucket         = "employee-app-terraform-state"
    key            = "employee-app/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock-table"
  }
}