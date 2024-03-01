import { BookStatus } from "@prisma/client";
import { CreateShelf } from "../controllers/shelfController.js";
import {
  badRequestError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import authRepository from "../repositories/authRepository.js";
import bookRepository from "../repositories/bookRepository.js";
import shelfRepository from "../repositories/shelfRepository.js";

export interface CreateIds {
  bookId: number;
  userId: number;
}

async function getShelfBooks(
  src: string | BookStatus,
  userId: number,
  filter: string
) {
  await userExist(userId);
  if (src) {
    if (filter === "categoria") {
      const shelfBooks = await shelfRepository.findBooksByCategory(src, userId);
      return shelfBooks;
    }
    if (filter === "ano") {
      const shelfBooks = await shelfRepository.findBooksByYear(src, userId);
      return shelfBooks;
    }
    if (Object.values(BookStatus).includes(src as BookStatus)) {
      const shelfBooks = await shelfRepository.findBooksByStatus(
        src as BookStatus,
        userId
      );
      return shelfBooks;
    }
    const shelfBooks = await shelfRepository.findBooksBySrc(src, userId);
    return shelfBooks;
  }
  if (filter === "favorite") {
    const shelfBooks = await shelfRepository.findFavoritesBooks(userId);
    return shelfBooks;
  }

  const shelfBooks = await shelfRepository.findMany(userId);
  return shelfBooks;
}

async function postShelfBooks(bookInfos: CreateShelf) {
  await userExist(bookInfos.userId);
  await bookExist(bookInfos.bookId);
  const ids = { bookId: bookInfos.bookId, userId: bookInfos.userId };
  await bookExistInShelf(ids);
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

async function bookExistInShelf(ids: CreateIds, exist?: string) {
  const shelfBookInfos = await shelfRepository.findBookShelfById(ids);
  if (exist === "needExist") {
    if (!shelfBookInfos) {
      const message = "Book does not exist in the shelf ";
      throw badRequestError(message);
    }
    return shelfBookInfos;
  } else {
    if (shelfBookInfos) {
      const message = "Book already in the shelf ";
      throw badRequestError(message);
    }
    return;
  }
}

const shelfService = {
  getShelfBooks,
  postShelfBooks,
  userExist,
  bookExist,
  bookExistInShelf,
};

export default shelfService;
