import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { getBookById } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.get("/book/:id", tokenValidation, getBookById);

export default bookRouter;
