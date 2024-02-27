import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { getShelfBooks } from "../controllers/shlefController.js";

const shelfRouter = Router();

shelfRouter.get("/shelf", tokenValidation, getShelfBooks);

export default shelfRouter;
