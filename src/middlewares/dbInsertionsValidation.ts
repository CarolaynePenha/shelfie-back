import { Request, Response, NextFunction } from "express";
import { unauthorizedError } from "./handleErrorsMiddleware.js";

export default async function insertionValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const insertionBooksKey = req.headers.insertionbookskey;
  if (insertionBooksKey !== process.env.INSERTION_BOOKS_KEY) {
    throw unauthorizedError();
  }
  next();
}
