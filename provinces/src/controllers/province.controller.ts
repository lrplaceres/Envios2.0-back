import { RequestHandler } from "express";
import provinceModel from "../models/Provinces";

export const createProvince: RequestHandler = async (req, res, next) => {
  try {
    const { name, acronym, latitude, longitude } = req.body;

    // Verificar si alguno de los campos ya existe en la base de datos
    const existingProvince = await provinceModel.findOne({
      $or: [{ name }],
    });

    // Si existe, retornar un error 301 y el mensaje correspondiente
    if (existingProvince) {
      let message = "";

      if (existingProvince.name === name) message = "La provincia ya existe";      

      // En lugar de retornar, usar res y luego salir de la función
      res.status(422).json({ message });
      return; // Para evitar que continúe ejecutándose
    }

    // Si no existe, crear y guardar el destinatario
    const receipent = new provinceModel(req.body);
    const saveProvince = await receipent.save();

    // Enviar la respuesta final
    res.json(saveProvince);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};

export const getProvinces: RequestHandler = async (req, res) => {
  try {
    const provinces = await provinceModel.find();
    res.json(provinces);
  } catch (error) {
    res.json(error);
  }
};

export const getProvince: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const provinceFound = await provinceModel.findById(id);
    if (!provinceFound) {
      res.status(204).json();
      return;
    }
    res.json(provinceFound);
  } catch (error) {
    res.json(error);
  }
};

export const updateProvince: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const provinceFound = await provinceModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!provinceFound) {
      res.status(204).json();
      return;
    }
    res.json(provinceFound);
  } catch (error) {
    res.json(error);
  }
};

export const deleteProvince: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const provinceFound = await provinceModel.findByIdAndDelete(id);
    if (!provinceFound) {
      res.status(204).json();
      return;
    }
    res.json(provinceFound);
  } catch (error) {
    res.json(error);
  }
};