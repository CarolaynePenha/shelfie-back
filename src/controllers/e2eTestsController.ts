import { Request, Response } from "express";
import shelfService from "../services/shelfService.js";

async function deleteAll(req: Request, res: Response) {
  await shelfService.deleteAll();
  res.sendStatus(200);
}

export default {
  deleteAll,
};
