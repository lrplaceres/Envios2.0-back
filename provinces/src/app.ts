import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import provinceRoute from "./routes/province.routes";
import municipalityRoute from "./routes/municipality.routes";

const app = express();
app.set("port", config.APP_PORT);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(provinceRoute);
app.use(municipalityRoute);

export default app;