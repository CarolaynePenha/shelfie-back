import { Router } from "express";
import {
  postAuthors,
  postBooks,
  postCategories,
} from "../controllers/dbInsertionsController.js";
import insertionValidation from "../middlewares/dbInsertionsValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import insertionBooksSchema from "../schemas/insertionBooksSchema.js";
import insertionCategoriesOrAuthorsSchema from "../schemas/insertionCategorySchema.js";

const dbInsertionRouter = Router();

dbInsertionRouter.post(
  "/insertionBooks",
  insertionValidation,
  validateSchema(insertionBooksSchema),
  postBooks
);

dbInsertionRouter.post(
  "/insertionAuthors",
  insertionValidation,
  validateSchema(insertionCategoriesOrAuthorsSchema),
  postAuthors
);

dbInsertionRouter.post(
  "/insertionCategories",
  insertionValidation,
  validateSchema(insertionCategoriesOrAuthorsSchema),
  postCategories
);

export default dbInsertionRouter;
