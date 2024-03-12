import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import shelfSchema from "../schemas/shelfSchema.js";
import {
  deleteShelfBook,
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
shelfRouter.delete("/shelf/:id", tokenValidation, deleteShelfBook);

export default shelfRouter;
