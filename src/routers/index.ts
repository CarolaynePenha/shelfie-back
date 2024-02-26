import { Router } from "express";
import authRouter from "./authrouter.js";
import dbInsertionRouter from "./dbInsertionsRouter.js";
const router = Router();

router.use(authRouter);
router.use(dbInsertionRouter);

export default router;
