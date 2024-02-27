import { prisma } from "../config/database.js";
import { CreateShelf } from "../controllers/shelfController.js";

async function findMany(userId: number) {
  const shelfBooks = await prisma.shelf.findMany({
    include: { book: { include: { rating: true } } },
    where: { userId },
  });
  return shelfBooks;
}

async function saveBook(bookInfos: CreateShelf) {
  return await prisma.shelf.create({ data: bookInfos });
}

async function findBookShelfById(bookId: number) {
  const book = await prisma.shelf.findFirst({ where: { bookId } });
  return book;
}
const shelfRepository = {
  findMany,
  saveBook,
  findBookShelfById,
};
export default shelfRepository;
