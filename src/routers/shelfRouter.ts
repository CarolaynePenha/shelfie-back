import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import shelfSchema from "../schemas/shelfSchema.js";
import {
  getShelfBooks,
  postShelfBooks,
} from "../controllers/shelfController.js";

const shelfRouter = Router();

shelfRouter.get("/shelf", tokenValidation, getShelfBooks);
shelfRouter.post(
  "/shelf",
  tokenValidation,
  validateSchema(shelfSchema),
  postShelfBooks
);

export default shelfRouter;
