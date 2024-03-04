import { Router } from "express";
import dbInsertionRouter from "./dbInsertionsRouter.js";
import SrcBarRouter from "./srcBarRouter.js";
import shelfRouter from "./shelfRouter.js";
import authRouter from "./authRouter.js";
import ratingRouter from "./ratingRouter.js";
import bookRouter from "./bookRouter.js";
const router = Router();

router.use(authRouter);
router.use(dbInsertionRouter);
router.use(SrcBarRouter);
router.use(shelfRouter);
router.use(ratingRouter);
router.use(bookRouter);

export default router;
