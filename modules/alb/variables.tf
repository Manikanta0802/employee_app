variable "vpc_id" {
  type        = string
  description = "VPC ID"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "Public subnets for ALB"
}

variable "alb_sg_id" {
  type        = string
  description = "ALB security group"
}

variable "ec2_instance_id" {
  type        = string
  description = "EC2 instance ID to register with ALB"
}
