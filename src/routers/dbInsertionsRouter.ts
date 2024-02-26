import { Router } from "express";
import {
  postAuthors,
  postBooks,
  postCategories,
} from "../controllers/dbInsertionsController.js";
import insertionValidation from "../middlewares/dbInsertionsValidation.js";

const dbInsertionRouter = Router();

dbInsertionRouter.post("/insertionBooks", insertionValidation, postBooks);

dbInsertionRouter.post("/insertionAuthors", insertionValidation, postAuthors);

dbInsertionRouter.post(
  "/insertionCategories",
  insertionValidation,
  postCategories
);

export default dbInsertionRouter;
