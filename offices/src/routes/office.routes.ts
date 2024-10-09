import { Router } from "express";
import * as officeCtrl from "../controllers/office.controller";

const router = Router();

router.post("/office", officeCtrl.createOffice);

router.get("/offices", officeCtrl.getOffices);

router.get("/office/:id", officeCtrl.getOffice);

router.put("/office/:id", officeCtrl.updateOffice);

router.delete("/office/:id", officeCtrl.deleteOffice);

export default router;