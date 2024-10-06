import { RequestHandler } from "express";
import clientModel from "../models/Client";

export const createClient: RequestHandler = async (req, res, next) => {
  try {
    const { phone, email, license, noUSCIS, passport } = req.body;

    // Verificar si alguno de los campos ya existe en la base de datos
    const existingClient = await clientModel.findOne({
      $or: [{ phone }, { email }, { license }, { noUSCIS }, { passport }],
    });

    // Si existe, retornar un error 301 y el mensaje correspondiente
    if (existingClient) {
      let message = "";

      if (existingClient.phone === phone) message = "El teléfono ya existe";
      else if (existingClient.email === email) message = "El correo ya existe";
      else if (existingClient.license === license)
        message = "La licencia ya existe";
      else if (existingClient.noUSCIS === noUSCIS)
        message = "El noUSCIS ya existe";
      else if (existingClient.passport === passport)
        message = "El pasaporte ya existe";

      // En lugar de retornar, usar res y luego salir de la función
      res.status(422).json({ message });
      return; // Para evitar que continúe ejecutándose
    }

    // Si no existe, crear y guardar el cliente
    const client = new clientModel(req.body);
    const saveClient = await client.save();

    // Enviar la respuesta final
    res.json(saveClient);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};

export const getClients: RequestHandler = async (req, res) => {
  try {
    const clients = await clientModel.find();
    res.json(clients);
  } catch (error) {
    res.json(error);
  }
};

export const getClient: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const clientFound = await clientModel.findById(id);
    if (!clientFound) {
      res.status(204).json();
      return;
    }
    res.json(clientFound);
  } catch (error) {
    res.json(error);
  }
};

export const updateClient: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const clientFound = await clientModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!clientFound) {
      res.status(204).json();
      return;
    }
    res.json(clientFound);
  } catch (error) {
    res.json(error);
  }
};

export const deleteClient: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const clientFound = await clientModel.findByIdAndDelete(id);
    if (!clientFound) {
      res.status(204).json();
      return;
    }
    res.json(clientFound);
  } catch (error) {
    res.json(error);
  }
};
