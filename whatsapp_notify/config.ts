import dotenv from "dotenv";
dotenv.config();

export default {
  RABBITMQ_HOST:process.env.RABBITMQ_HOST,
  RABBITMQ_USER:process.env.RABBITMQ_USER,
  RABBITMQ_PASSWORD:process.env.RABBITMQ_PASSWORD,
  RABBITMQ_QUEUE:process.env.RABBITMQ_QUEUE_NOTIFY_WH
};