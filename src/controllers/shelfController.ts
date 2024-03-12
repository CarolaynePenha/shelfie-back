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
  const { id } = req.params;
  const bookId = Number(id);
  await shelfService.deleteBook({ bookId, userId });
  res.sendStatus(200);
}
