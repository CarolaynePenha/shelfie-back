import { array } from "joi";
import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import bookRepository from "../repositories/bookRepository.js";
import shelfRepository from "../repositories/shelfRepository.js";
import { CreateIds } from "./shelfService.js";

async function findBookById(ids: CreateIds) {
  const book = await bookExist(ids.bookId);
  const shelfBookInfos = await shelfRepository.findBookShelfById(ids);
  const metricDone = await bookRepository.getMetricDone(ids.bookId);
  console.log("metricDone: ", metricDone);
  const metricWish = await bookRepository.getMetricWish(ids.bookId);
  const metricReading = await bookRepository.getMetricReading(ids.bookId);
  if (shelfBookInfos) {
    return {
      ...book,
      status: shelfBookInfos.status,
      metricDone: metricDone._count.status,
      metricWish: metricWish._count.status,
      metricReading: metricReading._count.status,
    };
  } else {
    return {
      ...book,
      status: null,
      metricDone: metricDone._count.status,
      metricWish: metricWish._count.status,
      metricReading: metricReading._count.status,
    };
  }
}

async function bookExist(id: number) {
  const book = await bookRepository.findBookById(id);
  if (!book) {
    const message = "Book not found";
    throw notFoundError(message);
  }

  return book;
}

async function getRanking() {
  const books = await bookRepository.getRanking();
  const totalRankings = await bookRepository.getTotalOfRankings();
  if (Array.isArray(books)) {
    const booksWithTotal = books.map((book) => {
      const totalOfRankings = totalRankings.find(
        (totalranking) => totalranking.bookId === book.id
      );
      return { ...book, totalOfRankings: totalOfRankings._count.id };
    });
    return booksWithTotal;
  } else {
    return books;
  }
}

const bookService = {
  bookExist,
  findBookById,
  getRanking,
};
export default bookService;
