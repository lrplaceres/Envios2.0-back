import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE_CLIENT,
  MONGO_HOST: process.env.MONGO_HOST_CLIENT,
  MONGO_PORT: process.env.MONGO_PORT_CLIENT,
  MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME_CLIENT,
  MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD_CLIENT,
  APP_PORT: 4000,
};
