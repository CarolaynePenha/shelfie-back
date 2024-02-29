import { Rating } from "@prisma/client";
import { Request, Response } from "express";
import ratingService from "../services/ratingService.js";

export type CreateRating = Omit<Rating, "id" | "createdAt">;

export async function postRating(req: Request, res: Response) {
  const { userId } = res.locals;
  const ratingInfos = req.body;
  await ratingService.postRating(ratingInfos, userId);
  res.sendStatus(201);
}
