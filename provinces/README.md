# Dependencias

```bash
npm init -y
```

```bash
npm i express mongoose morgan dotenv cors
```

```bash
npm i -D typescript @types/express @types/morgan @types/mongoose @types/cors @types/node ts-node-dev
```

## Ejecutar comando

```bash
npx tsc --init
```

## tsconfig.json

1. "target": "ES6"
2. "rootDir": "./src"
3. "outDir": "./dist"
4. "allowJs": true

## package.json

```bash
"scripts": {
    "start": "tsc && node dist/index.js",
    "build": "tsc",
    "dev": "ts-node-dev src/index.ts"
  },
```

## Docker Compose Setup

This project uses Docker Compose to manage services.

## Prerequisites

- Make sure you have [Docker](https://www.docker.com/get-started) installed on your machine.

## Docker Compose Configuration

The `docker-compose.yml` is configured as follows:

```bash
version: '3.8'
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

```bash
docker-compose up -d
```

## Stopping the Services

```bash
docker-compose down
```

## Docker save image

```bash
docker save -o your-image.tar your-image
```

## Docker load image

```bash
docker load --input your-image.tar
```
