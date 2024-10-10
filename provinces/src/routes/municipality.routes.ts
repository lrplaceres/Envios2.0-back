import { Router } from "express";
import * as municipalityCtrl from "../controllers/municipality.controller";

const router = Router();

router.post("/municipality", municipalityCtrl.createMunicipality);

router.get("/municipalities", municipalityCtrl.getMunicipalities);

router.get("/municipality/:id", municipalityCtrl.getMunicipality);

router.put("/municipality/:id", municipalityCtrl.updateMunicipality);

router.delete("/municipality/:id", municipalityCtrl.deleteMunicipality);

router.get("/municipalities/:id", municipalityCtrl.getMunicipalitiesByProvince);

export default router;