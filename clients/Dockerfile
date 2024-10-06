# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --production

# Copia el código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
# Puedes sobrescribir este valor con la variable de entorno PORT en el contenedor
EXPOSE ${APP_PORT}

# Define las variables de entorno necesarias (estas se pueden sobreescribir al ejecutar el contenedor)
ENV MONGO_URI="mongodb://localhost:27017/mydb"
ENV MONGO_DATABASE = "client"
ENV MONGO_HOST = "localhost"
ENV MONGO_PORT = "27017"
ENV MONGO_INITDB_ROOT_USERNAME = "admin"
ENV MONGO_INITDB_ROOT_PASSWORD = "admin"
ENV APP_PORT=4000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
