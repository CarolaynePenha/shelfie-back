import { Router } from "express";
import authRouter from "./authrouter.js";
import dbInsertionRouter from "./dbInsertionsRouter.js";
import SrcBarRouter from "./srcBarRouter.js";
const router = Router();

router.use(authRouter);
router.use(dbInsertionRouter);
router.use(SrcBarRouter);

export default router;
