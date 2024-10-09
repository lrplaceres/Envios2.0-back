import { RequestHandler } from "express";
import officeModel from "../models/Office";

export const createOffice: RequestHandler = async (req, res, next) => {
  try {
    const { name, phone, phone2, phone3, address, latitud, longitud } = req.body;

    // Verificar si alguno de los campos ya existe en la base de datos
    const existingOffice = await officeModel.findOne({
      $or: [{ name }],
    });

    // Si existe, retornar un error 301 y el mensaje correspondiente
    if (existingOffice) {
      let message = "";

      if (existingOffice.name === name) message = "El oficina ya existe";      

      // En lugar de retornar, usar res y luego salir de la función
      res.status(422).json({ message });
      return; // Para evitar que continúe ejecutándose
    }

    // Si no existe, crear y guardar el destinatario
    const office = new officeModel(req.body);
    const saveOffice = await office.save();

    // Enviar la respuesta final
    res.json(saveOffice);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};

export const getOffices: RequestHandler = async (req, res) => {
  try {
    const offices = await officeModel.find();
    res.json(offices);
  } catch (error) {
    res.json(error);
  }
};

export const getOffice: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const officeFound = await officeModel.findById(id);
    if (!officeFound) {
      res.status(204).json();
      return;
    }
    res.json(officeFound);
  } catch (error) {
    res.json(error);
  }
};

export const updateOffice: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const officeFound = await officeModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!officeFound) {
      res.status(204).json();
      return;
    }
    res.json(officeFound);
  } catch (error) {
    res.json(error);
  }
};

export const deleteOffice: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const officeFound = await officeModel.findByIdAndDelete(id);
    if (!officeFound) {
      res.status(204).json();
      return;
    }
    res.json(officeFound);
  } catch (error) {
    res.json(error);
  }
};