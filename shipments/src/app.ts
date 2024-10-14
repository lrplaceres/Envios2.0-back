import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import shipmentRoute from "./routes/shipment.routes";

const app = express();
app.set("port", config.APP_PORT);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(shipmentRoute);

export default app;