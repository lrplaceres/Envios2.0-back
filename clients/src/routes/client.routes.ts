import { Router } from "express";
import * as clientCtrl from "../controllers/client.controller";

const router = Router();

router.post("/client", clientCtrl.createClient);

export default router;