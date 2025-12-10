output "app_public_ip" {
  value       = module.ec2.ec2_public_ip
  description = "Public IP of app instance"
}

output "app_url" {
  value       = "http://${module.ec2.ec2_public_ip}:8080"
  description = "App URL (Spring Boot default port)"
}

output "rds_endpoint" {
  value = module.rds.rds_endpoint
}