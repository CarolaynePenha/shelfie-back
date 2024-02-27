import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import authRepository from "../repositories/authRepository.js";
import shelfRepository from "../repositories/shelfRepository.js";

async function getShelfBooks(userId: number) {
  await userExist(userId);
  await shelfRepository.findMany(userId);
}

async function userExist(userId: number) {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    const message = "User does not exist";
    throw notFoundError(message);
  }
  return user;
}

const shelfService = {
  getShelfBooks,
};

export default shelfService;
