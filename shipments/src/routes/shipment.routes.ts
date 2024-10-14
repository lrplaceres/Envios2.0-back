import { Router } from "express";
import * as shipmentCtrl from "../controllers/shipment.controller";

const router = Router();

router.post("/shipment", shipmentCtrl.createShipment);

router.get("/shipments", shipmentCtrl.getShipments);

router.get("/shipment/:id", shipmentCtrl.getShipment);

router.put("/shipment/:id", shipmentCtrl.updateShipment);

router.delete("/shipment/:id", shipmentCtrl.deleteShipment);

export default router;