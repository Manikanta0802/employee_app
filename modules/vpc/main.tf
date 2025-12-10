# -------------------------------
# VPC
# -------------------------------
resource "aws_vpc" "mini_project_vpc" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "MiniProjectVPC"
  }
}

# -------------------------------
# Internet Gateway
# -------------------------------
resource "aws_internet_gateway" "mini_project_igw" {
  vpc_id = aws_vpc.mini_project_vpc.id

  tags = {
    Name = "MiniProjectIGW"
  }
}

# -------------------------------
# Public Subnet AZ1
# -------------------------------
resource "aws_subnet" "public_subnet_az1" {
  vpc_id                  = aws_vpc.mini_project_vpc.id
  cidr_block              = var.public_subnet_cidr[0]
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "MiniProjectPublicSubnet-AZ1"
  }
}

# -------------------------------
# Public Subnet AZ2
# -------------------------------
resource "aws_subnet" "public_subnet_az2" {
  vpc_id                  = aws_vpc.mini_project_vpc.id
  cidr_block              = var.public_subnet_cidr[1]
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name = "MiniProjectPublicSubnet-AZ2"
  }
}

# -------------------------------
# Public Route Table
# -------------------------------
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.mini_project_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.mini_project_igw.id
  }

  tags = {
    Name = "MiniProjectPublicRT"
  }
}

# -------------------------------
# Associate Route Table with Public Subnets
# -------------------------------
resource "aws_route_table_association" "public_subnet_az1_rt_assoc" {
  subnet_id      = aws_subnet.public_subnet_az1.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet_az2_rt_assoc" {
  subnet_id      = aws_subnet.public_subnet_az2.id
  route_table_id = aws_route_table.public_route_table.id
}
