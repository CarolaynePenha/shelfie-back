import { CreateShelf } from "../controllers/shelfController.js";
import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import authRepository from "../repositories/authRepository.js";
import shelfRepository from "../repositories/shelfRepository.js";

async function getShelfBooks(userId: number) {
  await userExist(userId);
  const shelfBooks = await shelfRepository.findMany(userId);
  return shelfBooks;
}

async function postShelfBooks(bookInfos: CreateShelf) {
  await userExist(bookInfos.userId);
  await shelfRepository.saveBook(bookInfos);
  return;
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
  postShelfBooks,
};

export default shelfService;
