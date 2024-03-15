import { BookStatus, BookType } from "@prisma/client";
import { CreateShelf } from "../controllers/shelfController.js";
import {
  badRequestError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import authRepository from "../repositories/authRepository.js";
import shelfRepository from "../repositories/shelfRepository.js";
import bookService from "./bookService.js";
import ratingRepository from "../repositories/ratingRepository.js";

export interface CreateIds {
  bookId: number;
  userId: number;
  shelfId?: number;
}
export interface UpdateInfoFavoriteBook {
  bookId: number;
  favorite: boolean;
}
export interface UpdateBookInfos {
  iHave?: boolean;
  type?: BookType;
  status?: BookStatus;
  bookId: number;
  userId: number;
  favorite?: boolean;
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
  await bookService.bookExist(bookInfos.bookId);
  const ids = { bookId: bookInfos.bookId, userId: bookInfos.userId };
  await bookExistInShelf(ids);
  const shelfBook = await shelfRepository.saveBook(bookInfos);
  return shelfBook;
}

async function userExist(userId: number) {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    const message = "User does not exist";
    throw notFoundError(message);
  }
  return user;
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

async function deleteBook(ids: CreateIds) {
  await userExist(ids.userId);
  await bookExistInShelf(ids, "needExist");
  await handleRanting(ids);
  await shelfRepository.deleteBook(ids);
}

async function updatBook(bookInfos: UpdateBookInfos) {
  await userExist(bookInfos.userId);
  const ids = { bookId: bookInfos.bookId, userId: bookInfos.userId };
  await bookExistInShelf(ids, "needExist");
  await shelfRepository.updateBookInfos(ids, bookInfos);
}

async function updateFavoriteBook(
  userId: number,
  updateInfos: UpdateInfoFavoriteBook
) {
  await userExist(userId);
  const ids = { bookId: updateInfos.bookId, userId };
  await bookExistInShelf(ids, "needExist");
  await shelfRepository.updateFavoriteBook(ids, updateInfos.favorite);
}

async function handleRanting(ids: CreateIds) {
  const rating = await ratingRepository.findRating(ids);
  if (rating) {
    ratingRepository.deleteRating(ids.shelfId);
    return;
  }
  return;
}

async function getMetrics(userId: number) {
  await userExist(userId);
  const doneBooks = await shelfRepository.getMetrics(userId, "done");
  const abandonedBooks = await shelfRepository.getMetrics(userId, "abandoned");
  const wishBooks = await shelfRepository.getMetrics(userId, "wish");
  const totalBooks = await shelfRepository.getMetricsOfTotal(userId);
  const favoriteBooks = await shelfRepository.getMetricsOfFavorites(userId);
  const totalPages = await shelfRepository.getTotalOfReadingPages(userId);
  const metrics = {
    doneBooks: doneBooks._count.status,
    abandonedBooks: abandonedBooks._count.status,
    wishBooks: wishBooks._count.status,
    totalBooks: totalBooks._count.id,
    favoriteBooks: favoriteBooks._count.favorite,
    totalPages,
  };
  return metrics;
}

async function findBookById(ids: CreateIds) {
  await bookExistInShelf(ids, "needExist");
  const book = await shelfRepository.findBookById(ids);
  return book;
}

const shelfService = {
  getShelfBooks,
  postShelfBooks,
  userExist,
  bookExistInShelf,
  deleteBook,
  updatBook,
  getMetrics,
  updateFavoriteBook,
  findBookById,
};

export default shelfService;
