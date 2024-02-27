import { Router } from "express";
import tokenValidation from "./../middlewares/tokenValidation.js";
import { getSrcBooks } from "../controllers/srcBarController.js";

const SrcBarRouter = Router();

SrcBarRouter.get("/srcBar", tokenValidation, getSrcBooks);

export default SrcBarRouter;
