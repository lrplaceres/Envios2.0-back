import { RequestHandler } from "express";
import shipmentModel from "../models/Shipment";
import packageModel from "../models/Package";
import Package from "../models/Package";
import { packageInterface } from "../interfaces/package.interface";
import { SendRabbitMQ } from "../utils/SendRabbitMQ";
import config from "../config";
import { randomUUID } from "crypto";

export const createShipment: RequestHandler = async (req, res, next) => {
  try {
    const {
      client,
      receipent,
      office,
      province,
      municipality,
      value_total,
      value_customs,
      value_shipment,
      weight,
      date,
      description,
      packages,
    } = req.body;
    const packages_total=packages.length;
    const facture_number = 1;
    const code = randomUUID().toString();
    const status = "Nuevo";
    const status_delivery = "Nuevo";

    if (
      !client ||
      !receipent ||
      !office ||
      !province ||
      !municipality ||
      !value_total ||
      !value_customs ||
      !value_shipment ||
      !weight ||
      !date ||
      !description ||
      !packages
    ) {
      let message = "";
      if (!client) message = "El remitente es requerido";
      if (!receipent) message = "El destinatario es requerido";
      if (!office) message = "La oficina es requerida";
      if (!province) message = "La provincia es requerida";
      if (!municipality) message = "El municipio es requerido";
      if (!value_total) message = "El valor total es requerido";
      if (!value_customs) message = "El valor aduanal es requerido";
      if (!value_shipment) message = "El valor del envío es requerido";
      if (!weight) message = "El peso del envío es requerido";
      if (!date) message = "La fecha del envío es requerido";
      res.status(503).json({ message });
      return;
    }
    
    // Si no existe, crear y guardar el destinatario
    const shipment = new shipmentModel({
      ...{
        client,
        receipent,
        office,
        packages_total,
        facture_number,
        status,
        code,
        province,
        municipality,
        value_total,
        value_customs,
        value_shipment,
        weight,
        date,
        description,
        status_delivery,
      },
    });
    const saveShipment = await shipment.save();

    packages.map((pack: packageInterface) => {
      let newPackage = new Package(pack);
      newPackage.shipment = saveShipment.id;
      const savePackage = newPackage.save();
    });

    SendRabbitMQ(config.RABBITMQ_QUEUE, {
      text: "Gracias confiar en nosotros para gestionar su envío",
      phone: "+5354455921",
    });

    // Enviar la respuesta final
    res.json(saveShipment);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};

export const getShipments: RequestHandler = async (req, res) => {
  try {
    const shipments = await shipmentModel.find();
    res.json(shipments);
  } catch (error) {
    res.json(error);
  }
};

export const getShipment: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const shipmentFound = await shipmentModel.findById(id);
    if (!shipmentFound) {
      res.status(204).json();
      return;
    }
    res.json(shipmentFound);
  } catch (error) {
    res.json(error);
  }
};

export const updateShipment: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const shipmentFound = await shipmentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!shipmentFound) {
      res.status(204).json();
      return;
    }

    //ELIMINAR TODOS LOS PAQUETES ACTUALES
    const oldPackages = await packageModel.find({ shipment: id });
    oldPackages.map(async (old) => {
      await packageModel.findByIdAndDelete(old.id);
    });

    //CAPTURAR E INSERTAR LOS NUEVOS PAQUETES
    const { packages } = req.body;
    packages.map((pack: packageInterface) => {
      let newPackage = new Package(pack);
      newPackage.shipment = shipmentFound.id;
      const savePackage = newPackage.save();
    });

    res.json(shipmentFound);
  } catch (error) {
    res.json(error);
  }
};

export const deleteShipment: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const shipmentFound = await shipmentModel.findByIdAndDelete(id);
    if (!shipmentFound) {
      res.status(204).json();
      return;
    }

    //ELIMINAR TODOS LOS PAQUETES DEL ENVIO
    const oldPackages = await packageModel.find({ shipment: id });
    oldPackages.map(async (old) => {
      await packageModel.findByIdAndDelete(old.id);
    });

    res.json(shipmentFound);
  } catch (error) {
    res.json(error);
  }
};
