import { Router } from "express";
import * as clientCtrl from "../controllers/client.controller";

const router = Router();

router.post("/client", clientCtrl.createClient);

router.get("/clients", clientCtrl.getClients);

export default router;