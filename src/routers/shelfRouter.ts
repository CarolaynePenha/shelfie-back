import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { shelfSchema, updateShelfSchema } from "../schemas/shelfSchema.js";
import {
  deleteShelfBook,
  getShelfBooks,
  postShelfBooks,
  updateShelfBook,
} from "../controllers/shelfController.js";

const shelfRouter = Router();

shelfRouter.get("/shelf", tokenValidation, getShelfBooks);
shelfRouter.post(
  "/shelf",
  tokenValidation,
  validateSchema(shelfSchema),
  postShelfBooks
);
shelfRouter.delete("/shelf/:idBook/:idShelf", tokenValidation, deleteShelfBook);
shelfRouter.put(
  "/shelf",
  tokenValidation,
  validateSchema(updateShelfSchema),
  updateShelfBook
);

export default shelfRouter;
