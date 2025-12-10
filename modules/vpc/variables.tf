variable "aws_region" {
  type = string
}

variable "vpc_cidr_block" {
  type = string
}

variable "public_subnet_cidr" {
  type = list(string)
}
