import { Request, Response } from "express";
import bookService from "../services/bookService.js";

export async function getBookById(req: Request, res: Response) {
  const { id } = req.params;
  const book = await bookService.bookExist(Number(id));
  res.status(200).send(book);
}
