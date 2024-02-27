import joi from "joi";
import { CreateShelf } from "../controllers/shelfController.js";

const shelfSchema = joi.object<CreateShelf>({
  bookId: joi.number().required(),
  iHave: joi.boolean(),
  type: joi.string().valid("paper", "ebook", "audio").required(),
  status: joi
    .string()
    .valid("done", "reading", "wish", "abandoned", "rereading")
    .required(),
});

export default shelfSchema;
