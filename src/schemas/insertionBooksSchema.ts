import joi from "joi";
import { CreateBooks } from "../controllers/dbInsertionsController.js";

const insertionBooksSchema = joi.object<CreateBooks | CreateBooks[]>({
  title: joi.string().required(),
  synopsis: joi.string().required(),
  authorId: joi.number().required(),
  categoryId: joi.number().required(),
  totalPages: joi.number().required(),
  preSale: joi.boolean(),
  release: joi.boolean(),
});

export default insertionBooksSchema;
