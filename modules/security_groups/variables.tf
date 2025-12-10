variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "my_ip_cidr" {
  description = "Your public IP in CIDR format (e.g., 49.205.120.11/32)"
  type        = string
}
