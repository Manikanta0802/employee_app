output "vpc_id" {
  value = aws_vpc.mini_project_vpc.id
}

output "public_subnet_ids" {
  value = [
    aws_subnet.public_subnet_az1.id,
    aws_subnet.public_subnet_az2.id
  ]
}
