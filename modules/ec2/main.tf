resource "aws_instance" "app_server" {
  ami                         = var.app_ami_id
  instance_type               = "t3.micro"
  key_name                    = var.key_pair_name
  subnet_id                   = var.public_subnet_id
  vpc_security_group_ids      = [var.ec2_sg_id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              systemctl enable docker
              systemctl start docker

              # Pull and run app container if provided
              if [ -n "${var.docker_image}" ]; then
                docker pull ${var.docker_image}
                docker run -d --restart always -p 8080:8080 ${var.docker_image}
              fi
              EOF

  tags = {
    Name = "app-server"
    Project = "MiniProject"
  }
}
