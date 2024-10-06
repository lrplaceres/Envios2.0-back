import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

(async () => {
  try {
    const options: ConnectOptions = {};
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_INITDB_ROOT_USERNAME}:${config.MONGO_INITDB_ROOT_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DATABASE}?authSource=admin&authMechanism=SCRAM-SHA-1`,
      options
    );
    console.log("Database is connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
