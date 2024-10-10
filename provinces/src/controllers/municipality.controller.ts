import { RequestHandler } from "express";
import municipalityModel from "../models/Municipality";

export const createMunicipality: RequestHandler = async (req, res, next) => {
  try {
    const { name, province, latitude, longitude } = req.body;

    // Si no existe, crear y guardar el destinatario
    const receipent = new municipalityModel(req.body);
    const saveMunicipality = await receipent.save();

    // Enviar la respuesta final
    res.json(saveMunicipality);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};

export const getMunicipalities: RequestHandler = async (req, res) => {
  try {
    const municipalities = await municipalityModel.find();
    res.json(municipalities);
  } catch (error) {
    res.json(error);
  }
};

export const getMunicipality: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const municipalityFound = await municipalityModel.findById(id);
    if (!municipalityFound) {
      res.status(204).json();
      return;
    }
    res.json(municipalityFound);
  } catch (error) {
    res.json(error);
  }
};

export const updateMunicipality: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const municipalityFound = await municipalityModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!municipalityFound) {
      res.status(204).json();
      return;
    }
    res.json(municipalityFound);
  } catch (error) {
    res.json(error);
  }
};

export const deleteMunicipality: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const municipalityFound = await municipalityModel.findByIdAndDelete(id);
    if (!municipalityFound) {
      res.status(204).json();
      return;
    }
    res.json(municipalityFound);
  } catch (error) {
    res.json(error);
  }
};

export const getMunicipalitiesByProvince: RequestHandler = async (req, res) => {
    const id = req.params.id;
    try {
      const municipalitiesFound = await municipalityModel.find({province: id}).sort({
        name: "asc"
      });
      if (!municipalitiesFound) {
        res.status(204).json();
        return;
      }
      res.json(municipalitiesFound);
    } catch (error) {
      res.json(error);
    }
}