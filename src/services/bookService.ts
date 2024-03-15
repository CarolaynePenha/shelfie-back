import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import bookRepository from "../repositories/bookRepository.js";
import shelfRepository from "../repositories/shelfRepository.js";
import { CreateIds } from "./shelfService.js";

async function findBookById(ids: CreateIds) {
  const book = await bookExist(ids.bookId);
  const shelfBookInfos = await shelfRepository.findBookShelfById(ids);
  if (shelfBookInfos) {
    return { ...book, status: shelfBookInfos.status };
  } else {
    return { ...book, status: null };
  }
}

async function bookExist(id: number) {
  const book = await bookRepository.findBookById(id);
  if (!book) {
    const message = "Book not found:book";
    throw notFoundError(message);
  }

  return book;
}

const bookService = {
  bookExist,
  findBookById,
};
export default bookService;
