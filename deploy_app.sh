#!/bin/bash
set -e

echo "================================="
echo " Updating OS"
echo "================================="
apt update -y

echo "================================="
echo " Installing Docker"
echo "================================="
apt install -y docker.io docker-compose
systemctl start docker
systemctl enable docker

echo "================================="
echo " Removing old project folder"
echo "================================="
rm -rf employee-availability-app

echo "================================="
echo " Cloning GitHub repo (Application)"
echo "================================="
git clone https://github.com/panthangiEshwary/employee-availability-app.git
cd employee-availability-app

echo "================================="
echo " Detecting Private IP for metrics tagging"
echo "================================="
PRIVATE_IP=$(hostname -I | awk '{print $1}')

echo "================================="
echo " Updating backend application.properties with instance tag"
echo "================================="
sed -i "s|management.metrics.tags.instance=.*|management.metrics.tags.instance=${PRIVATE_IP}:8080|" \
backend/src/main/resources/application.properties || true

echo "➡ Updated metrics instance tag to: ${PRIVATE_IP}:8080"

echo "================================="
echo " Starting Docker Compose (Application)"
echo "================================="
docker-compose up -d --build

echo "================================="
echo " Starting Node Exporter"
echo "================================="
docker run -d \
  --name node-exporter \
  -p 9100:9100 \
  --restart unless-stopped \
  prom/node-exporter

echo "================================="
echo " Application Deployment Complete!"
echo "================================="

PUBLIC_IP=$(curl -s ifconfig.me)

echo "Frontend URL:       http://$PUBLIC_IP"
echo "Backend Hello:      http://$PUBLIC_IP:8080/hello"
echo "Backend Health:     http://$PUBLIC_IP:8080/health"
echo "Prometheus Metrics: http://$PUBLIC_IP:8080/actuator/prometheus"
