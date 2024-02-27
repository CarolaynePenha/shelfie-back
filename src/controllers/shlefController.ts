import { Request, Response } from "express";
import shelfService from "../services/shelfService.js";

export async function getShelfBooks(req: Request, res: Response) {
  const { userId } = res.locals;
  const shelfBooks = await shelfService.getShelfBooks(userId);
  res.status(200).send(shelfBooks);
}
