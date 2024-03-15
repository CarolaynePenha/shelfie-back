import { Request, Response } from "express";
import bookService from "../services/bookService.js";

export async function getBookById(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  const ids = { bookId: Number(id), userId };
  const book = await bookService.findBookById(ids);
  res.status(200).send(book);
}
