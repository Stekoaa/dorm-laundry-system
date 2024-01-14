#!/bin/sh

docker image rm -f laundry-frontend
docker image rm -f laundry-backend

docker compose build
docker compose up