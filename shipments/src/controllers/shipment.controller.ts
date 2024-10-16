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

    // Definir un objeto con los mensajes de error para cada campo requerido
    const requiredFields: any = {
      client: "El remitente es requerido",
      receipent: "El destinatario es requerido",
      office: "La oficina es requerida",
      province: "La provincia es requerida",
      municipality: "El municipio es requerido",
      value_total: "El valor total es requerido",
      value_customs: "El valor aduanal es requerido",
      value_shipment: "El valor del envío es requerido",
      weight: "El peso del envío es requerido",
      date: "La fecha del envío es requerida",
      packages: "Es requerido tener paquete",
    };

    // Encontrar el primer campo que falte
    const missingField = Object.keys(requiredFields).find(
      (field) => !req.body[field]
    );

    if (missingField) {
      res.status(422).json({ message: requiredFields[missingField] });
      return;
    }

    const packages_total = packages?.length || 0;
    const facture_number = 1;
    const code = randomUUID().toString();
    const status = "new";
    const status_delivery = "new";

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

    SendRabbitMQ(
      config.RABBITMQ_QUEUE,
      JSON.stringify({
        text: "Gracias confiar en nosotros para gestionar su envío",
        cellphone: "+5354455921",
      })
    );

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
