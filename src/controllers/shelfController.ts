import { Request, Response } from "express";
import shelfService from "../services/shelfService.js";
import { Shelf } from "@prisma/client";

export type CreateShelf = Omit<Shelf, "id" | "createdAt">;

export async function getShelfBooks(req: Request, res: Response) {
  const { userId } = res.locals;
  const shelfBooks = await shelfService.getShelfBooks(userId);
  res.status(200).send(shelfBooks);
}

export async function postShelfBooks(req: Request, res: Response) {
  const { userId } = res.locals;
  const shelfInfos: CreateShelf = req.body;
  await shelfService.postShelfBooks({ ...shelfInfos, userId });
  res.sendStatus(201);
}
