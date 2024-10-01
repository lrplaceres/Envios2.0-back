import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_PORT: process.env.MONGO_PORT,
  APP_PORT: process.env.APP_PORT,
};
