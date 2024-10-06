import { Router } from "express";
import * as clientCtrl from "../controllers/client.controller";

const router = Router();

router.post("/client", clientCtrl.createClient);

router.get("/clients", clientCtrl.getClients);

router.get("/client/:id", clientCtrl.getClient);

router.put("/client/:id", clientCtrl.updateClient);

router.delete("/client/:id", clientCtrl.deleteClient);

export default router;
