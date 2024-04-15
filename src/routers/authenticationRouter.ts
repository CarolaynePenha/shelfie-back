import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import { signIn, signUp } from "../controllers/authController.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post("/signUp", validateSchema(signUpSchema), signUp);
authRouter.post("/signIn", validateSchema(signInSchema), signIn);

export default authRouter;
