import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import bookRepository from "../repositories/bookRepository.js";

async function bookExist(bookId: number) {
  const book = await bookRepository.findBookById(bookId);
  if (!book) {
    const message = "Book not found";
    throw notFoundError(message);
  }
  return book;
}

const bookService = {
  bookExist,
};
export default bookService;
