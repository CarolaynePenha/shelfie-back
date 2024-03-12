import joi from "joi";
import { CreateRating } from "../controllers/ratingController.js";

export const ratingSchema = joi.object<CreateRating>({
  shelfId: joi.number().required(),
  bookId: joi.number().required(),
  stars: joi.number().max(5).required(),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
});
export const updateratingSchema = joi.object<CreateRating>({
  shelfId: joi.number().required(),
  bookId: joi.number().required(),
  stars: joi.number().max(5),
  startDate: joi.date(),
  endDate: joi.date(),
});
