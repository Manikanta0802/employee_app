# -----------------------------------
# EC2 SG (SSH + App access)
# -----------------------------------
resource "aws_security_group" "ec2_sg" {
  name        = "mini_project_ec2_sg"
  description = "Allow SSH + App traffic to EC2"
  vpc_id      = var.vpc_id

  # Allow SSH only from your local IP
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip_cidr]
    description = "SSH Access"
  }

  # Allow App access (Spring Boot on port 8080)
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]   # OPEN for demo
    description = "App access"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "EC2-SG"
    Project = "MiniProject"
  }
}

# -----------------------------------
# ALB SG (HTTP/HTTPS)
# -----------------------------------
resource "aws_security_group" "alb_sg" {
  name        = "mini_project_alb_sg"
  description = "Allow HTTP/HTTPS to ALB"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTP"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTPS"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "ALB-SG"
    Project = "MiniProject"
  }
}

# -----------------------------------
# RDS SG (MySQL only from EC2)
# -----------------------------------
resource "aws_security_group" "rds_sg" {
  name        = "mini_project_rds_sg"
  description = "Allow MySQL traffic from EC2 only"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
    description     = "Allow MySQL from EC2 only"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "RDS-SG"
    Project = "MiniProject"
  }
}
