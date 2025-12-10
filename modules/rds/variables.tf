variable "public_subnet_ids" {
  description = "List of public subnet IDs for RDS"
  type        = list(string)
}

variable "rds_sg_id" {
  description = "Security group for RDS"
  type        = string
}

variable "db_master_username" {
  type = string
}

variable "db_master_password" {
  type      = string
  sensitive = true
}
