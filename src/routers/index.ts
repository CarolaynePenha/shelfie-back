import { Router } from "express";
import dbInsertionRouter from "./dbInsertionsRouter.js";
import SrcBarRouter from "./srcBarRouter.js";
import shelfRouter from "./shelfRouter.js";
import authRouter from "./authRouter.js";
import ratingRouter from "./ratingRouter.js";
const router = Router();

router.use(authRouter);
router.use(dbInsertionRouter);
router.use(SrcBarRouter);
router.use(shelfRouter);
router.use(ratingRouter);

export default router;
