import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { shelfSchema, updateShelfSchema } from "../schemas/shelfSchema.js";
import {
  deleteShelfBook,
  findBookById,
  getMetrics,
  getShelfBooks,
  postShelfBooks,
  updateFavoriteBook,
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
shelfRouter.put("/shelf/favorite", tokenValidation, updateFavoriteBook);
shelfRouter.delete("/shelf/:idBook/:idShelf", tokenValidation, deleteShelfBook);
shelfRouter.put(
  "/shelf",
  tokenValidation,
  validateSchema(updateShelfSchema),
  updateShelfBook
);
shelfRouter.get("/shelf/metrics", tokenValidation, getMetrics);

shelfRouter.get("/shelf/:id", tokenValidation, findBookById);

export default shelfRouter;
