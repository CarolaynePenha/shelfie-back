import { CreateShelf } from "../controllers/shelfController.js";
import {
  badRequestError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import bookRepository from "../repositories/BookRepository.js";
import authRepository from "../repositories/authRepository.js";
import shelfRepository from "../repositories/shelfRepository.js";

async function getShelfBooks(userId: number) {
  await userExist(userId);
  const shelfBooks = await shelfRepository.findMany(userId);
  return shelfBooks;
}

async function postShelfBooks(bookInfos: CreateShelf) {
  await userExist(bookInfos.userId);
  await bookExist(bookInfos.bookId);
  await bookExistInShelf(bookInfos.bookId);
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

async function bookExist(bookId: number) {
  const book = await bookRepository.findBookById(bookId);
  if (!book) {
    const message = "Book not found";
    throw notFoundError(message);
  }
  return;
}

async function bookExistInShelf(bookId: number) {
  const book = await shelfRepository.findBookShelfById(bookId);
  if (book) {
    const message = "Bookalready in the shelf ";
    throw badRequestError(message);
  }
  return;
}

const shelfService = {
  getShelfBooks,
  postShelfBooks,
};

export default shelfService;
