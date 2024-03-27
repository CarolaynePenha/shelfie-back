import joi from "joi";
import { CreateShelf } from "../controllers/shelfController.js";
import { UpdateInfoFavoriteBook } from "../services/shelfService.js";

export const shelfSchema = joi.object<CreateShelf>({
  bookId: joi.number().required(),
  iHave: joi.boolean(),
  type: joi.string().valid("paper", "ebook", "audio").required(),
  status: joi
    .string()
    .valid("done", "reading", "wish", "abandoned", "rereading")
    .required(),
  favorite: joi.boolean(),
});

export const updateShelfSchema = joi.object<CreateShelf>({
  bookId: joi.number().required(),
  iHave: joi.boolean(),
  type: joi.string().valid("paper", "ebook", "audio"),
  status: joi
    .string()
    .valid("done", "reading", "wish", "abandoned", "rereading"),
});

export const updateFavoriteBookSchema = joi.object<UpdateInfoFavoriteBook>({
  bookId: joi.number().required(),
  favorite: joi.boolean().required(),
});
