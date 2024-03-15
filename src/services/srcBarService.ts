import shelfRepository from "../repositories/shelfRepository.js";
import srcBarRepository from "../repositories/srcBarRepository.js";
import { CreateIds } from "./shelfService.js";

async function getSrcBooks(src: string, userId: number) {
  const books = await srcBarRepository.getBooks(src);
  const booksWithStatusArr = await Promise.all(
    books.map(async (book) => {
      const ids = { bookId: book.id, userId };
      const status = await getStatus(ids);
      const bookWithStatus = { ...book, status };
      return bookWithStatus;
    })
  );
  return booksWithStatusArr;
}

async function getStatus(ids: CreateIds) {
  const shelfBookInfos = await shelfRepository.findBookShelfById(ids);
  if (shelfBookInfos) {
    return shelfBookInfos.status;
  } else {
    return null;
  }
}

const srcBarService = {
  getSrcBooks,
};
export default srcBarService;
