import joi from "joi";
import { CreateCategories } from "../controllers/dbInsertionsController.js";

const insertionCategoriesOrAuthorsSchema = joi.object<CreateCategories>({
  name: joi.string().required(),
});

export default insertionCategoriesOrAuthorsSchema;
