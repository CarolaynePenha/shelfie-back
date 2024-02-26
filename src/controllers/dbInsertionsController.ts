import { Request, Response } from "express";
import { Author, Book, Category } from "@prisma/client";

import dbInsertionsService from "../services/dbInsertionsService.js";

export type CreateBooks = Omit<Book, "id" | "createdAt">;
export type CreateAuthors = Omit<Author, "id">;
export type CreateCategories = Omit<Category, "id">;

export async function postBooks(req: Request, res: Response) {
  const booksInfos: CreateBooks = req.body;
  await dbInsertionsService.saveBooks(booksInfos);
  res.sendStatus(201);
}

export async function postAuthors(req: Request, res: Response) {
  const authorsInfos: CreateAuthors = req.body;
  await dbInsertionsService.saveAuthors(authorsInfos);
  res.sendStatus(201);
}

export async function postCategories(req: Request, res: Response) {
  const categoriesInfos: CreateCategories = req.body;
  await dbInsertionsService.saveCategories(categoriesInfos);
  res.sendStatus(201);
}
