import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";

import ratingSchema from "../schemas/ratingSchema.js";
import { postRating } from "../controllers/ratingController.js";

const ratingRouter = Router();

ratingRouter.post(
  "/rating",
  tokenValidation,
  validateSchema(ratingSchema),
  postRating
);

export default ratingRouter;
