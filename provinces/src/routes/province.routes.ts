import { Router } from "express";
import * as provinceCtrl from "../controllers/province.controller";

const router = Router();

router.post("/province", provinceCtrl.createProvince);

router.get("/provinces", provinceCtrl.getProvinces);

router.get("/province/:id", provinceCtrl.getProvince);

router.put("/province/:id", provinceCtrl.updateProvince);

router.delete("/province/:id", provinceCtrl.deleteProvince);

export default router;