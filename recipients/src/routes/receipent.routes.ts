import { Router } from "express";
import * as receipCtrl from "../controllers/receipent.controller";

const router = Router();

router.post("/receipent", receipCtrl.createReceipent);

router.get("/receipents", receipCtrl.getReceipents);

router.get("/receipent/:id", receipCtrl.getReceipent);

router.put("/receipent/:id", receipCtrl.updateReceipent);

router.delete("/receipent/:id", receipCtrl.deleteReceipent);

export default router;