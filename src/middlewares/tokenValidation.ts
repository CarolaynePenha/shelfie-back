import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "./handleErrorsMiddleware.js";
export default async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) {
    const message = "Mandatory token sending";
    throw unauthorizedError(message);
  }
  try {
    jwt.verify(token, process.env.KEY);
  } catch (error) {
    const message = `Invalid token: ${error.message}`;
    throw unauthorizedError(message);
  }

  next();
}
