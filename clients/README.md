# Docker Compose Setup

This project uses Docker Compose to manage services.

## Prerequisites

- Make sure you have [Docker](https://www.docker.com/get-started) installed on your machine.

## Docker Compose Configuration

The `docker-compose.yml` is configured as follows:

```bash
version: '3'
services:
  app:
    image: your-image
    env_file:
      - .env
    ports:
      - "4000:4000"
```

or

```bash
docker run --env-file .env -p 4000:4000 your-image
```

## Ejecute project

docker-compose up -d

## Stopping the Services

docker-compose down

## Docker save image

```bash
docker save -o your-image.tar your-image
```

## Docker load image

```bash
docker load --input your-image.tar
```
