import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";

const shelfRouter = Router();

shelfRouter.get("/shelf", tokenValidation);

export default shelfRouter;
