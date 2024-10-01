import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import clientRoute from "./routes/client.routes";

const app = express();
app.set("port", config.APP_PORT);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(clientRoute);

export default app;