import { Request, Response } from "express";
import srcBarService from "../services/srcBarService.js";

export async function getSrcBooks(req: Request, res: Response) {
  const { src } = req.query;
  const srcBooks = await srcBarService.getSrcBooks(src as string);
  res.status(200).send(srcBooks);
}
