output "alb_dns_name" {
  description = "The DNS name of the ALB"
  value       = aws_lb.app_alb.dns_name
}

output "alb_arn" {
  description = "ALB ARN"
  value       = aws_lb.app_alb.arn
}

output "target_group_arn" {
  description = "Target group ARN"
  value       = aws_lb_target_group.app_tg.arn
}
