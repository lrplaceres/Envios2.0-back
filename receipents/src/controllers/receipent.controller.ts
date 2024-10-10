import { RequestHandler } from "express";
import receipentModel from "../models/Receipent";

export const createReceipent: RequestHandler = async (req, res, next) => {
  try {
    const { name, phone, cellphone, address, numberId } = req.body;

    // Verificar si alguno de los campos ya existe en la base de datos
    const existingReceipent = await receipentModel.findOne({
      $or: [{ numberId }],
    });

    // Si existe, retornar un error 301 y el mensaje correspondiente
    if (existingReceipent) {
      let message = "";

      if (existingReceipent.numberId === numberId) message = "El teléfono ya existe";      

      // En lugar de retornar, usar res y luego salir de la función
      res.status(422).json({ message });
      return; // Para evitar que continúe ejecutándose
    }

    // Si no existe, crear y guardar el destinatario
    const receipent = new receipentModel(req.body);
    const saveReceipent = await receipent.save();

    // Enviar la respuesta final
    res.json(saveReceipent);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};

export const getReceipents: RequestHandler = async (req, res) => {
  try {
    const receipents = await receipentModel.find();
    res.json(receipents);
  } catch (error) {
    res.json(error);
  }
};

export const getReceipent: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const receipentFound = await receipentModel.findById(id);
    if (!receipentFound) {
      res.status(204).json();
      return;
    }
    res.json(receipentFound);
  } catch (error) {
    res.json(error);
  }
};

export const updateReceipent: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const receipentFound = await receipentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!receipentFound) {
      res.status(204).json();
      return;
    }
    res.json(receipentFound);
  } catch (error) {
    res.json(error);
  }
};

export const deleteReceipent: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const receipentFound = await receipentModel.findByIdAndDelete(id);
    if (!receipentFound) {
      res.status(204).json();
      return;
    }
    res.json(receipentFound);
  } catch (error) {
    res.json(error);
  }
};