import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { getBookById, getRanking } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.get("/book/:id", tokenValidation, getBookById);
bookRouter.get("/ranking", tokenValidation, getRanking);

export default bookRouter;
