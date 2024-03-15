import { Request, Response } from "express";
import shelfService from "../services/shelfService.js";
import { Shelf } from "@prisma/client";

export type CreateShelf = Omit<Shelf, "id" | "createdAt">;

export async function getShelfBooks(req: Request, res: Response) {
  const { userId } = res.locals;
  const { src, filter } = req.query;
  const shelfBooks = await shelfService.getShelfBooks(
    src as string,
    userId,
    filter as string
  );
  res.status(200).send(shelfBooks);
}

export async function postShelfBooks(req: Request, res: Response) {
  const { userId } = res.locals;
  const shelfInfos: CreateShelf = req.body;
  const shelfBook = await shelfService.postShelfBooks({
    ...shelfInfos,
    userId,
  });
  res.status(201).send(shelfBook);
}

export async function deleteShelfBook(req: Request, res: Response) {
  const { userId } = res.locals;
  const { idBook, idShelf } = req.params;
  const bookId = Number(idBook);
  const shelfId = Number(idShelf);

  await shelfService.deleteBook({ bookId, shelfId, userId });
  res.sendStatus(200);
}
export async function updateShelfBook(req: Request, res: Response) {
  const { userId } = res.locals;
  const bookInfos = req.body;
  await shelfService.updatBook({ ...bookInfos, userId });
  res.sendStatus(200);
}

export async function getMetrics(req: Request, res: Response) {
  const { userId } = res.locals;
  const metrics = await shelfService.getMetrics(userId);
  res.status(200).send(metrics);
}

export async function updateFavoriteBook(req: Request, res: Response) {
  const { userId } = res.locals;
  const updateInfos = req.body;
  await shelfService.updateFavoriteBook(userId, updateInfos);
  res.sendStatus(201);
}
