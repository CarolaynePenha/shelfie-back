import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository.js";
import { CreateUser } from "../controllers/authController.js";
import {
  conflictError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";

async function saveUser(signUpInfos: CreateUser) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(signUpInfos.password, SALT);
  const emailLowerCase = signUpInfos.email.toLowerCase();
  await userExists(emailLowerCase, "signUp");
  await authRepository.postUserInfos({
    ...signUpInfos,
    email: emailLowerCase,
    password: passwordHash,
  });
}
async function userExists(email: string, type: string) {
  const user = await authRepository.findByEmail(email);
  if (type === "signUp" && user) {
    const message = "email already exists";
    throw conflictError(message);
  }
  if (type === "signIn" && !user) {
    const message = "Invalid email or password";
    throw unauthorizedError(message);
  }
  return user;
}
async function createSession(signInInfos: CreateUser) {
  const emailLowerCase = signInInfos.email.toLowerCase();
  const user = await userExists(emailLowerCase, "signIn");
  validPassword(signInInfos.password, user.password);
  const token = tokenGeneration(user.id);
  await authRepository.createSession({ token, userId: user.id });
  return token;
}
function validPassword(textPassword: string, hashPassword: string) {
  const validation = bcrypt.compareSync(textPassword, hashPassword);
  if (!validation) {
    const message = "Invalid email or password";
    throw unauthorizedError(message);
  }
}
function tokenGeneration(id: number) {
  const token = jwt.sign(
    {
      data: id,
    },
    process.env.KEY,
    { expiresIn: "1h" }
  );
  return token;
}

const authService = {
  saveUser,
  createSession,
};
export default authService;
