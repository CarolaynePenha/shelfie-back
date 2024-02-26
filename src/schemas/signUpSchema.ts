import joi from "joi";
import { CreateUser } from "../controllers/authController.js";

const signUpSchema = joi.object<CreateUser>({
  name: joi.string().required().max(30),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi
    .string()
    .pattern(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/
    )
    .required(),
  image: joi.string().uri().required(),
});

export default signUpSchema;
