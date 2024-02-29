import joi from "joi";
import { CreateRating } from "../controllers/ratingController.js";

const ratingSchema = joi.object<CreateRating>({
  shelfId: joi.number().required(),
  bookId: joi.number().required(),
  stars: joi.number().max(5).required(),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
});

export default ratingSchema;
