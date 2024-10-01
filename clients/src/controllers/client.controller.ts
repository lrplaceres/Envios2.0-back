import { RequestHandler } from "express";
import clientModel from "../models/Client";

export const createClient: RequestHandler = async (req, res) => {
  const client = new clientModel(req.body);
  const saveClient = await client.save();
  res.json(saveClient);
};
