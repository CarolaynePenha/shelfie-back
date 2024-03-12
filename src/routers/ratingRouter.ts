import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";

import { postRating, updateRating } from "../controllers/ratingController.js";
import { ratingSchema, updateratingSchema } from "../schemas/ratingSchema.js";

const ratingRouter = Router();

ratingRouter.post(
  "/rating",
  tokenValidation,
  validateSchema(ratingSchema),
  postRating
);
ratingRouter.put(
  "/rating",
  tokenValidation,
  validateSchema(updateratingSchema),
  updateRating
);

export default ratingRouter;
