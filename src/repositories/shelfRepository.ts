import { prisma } from "../config/database.js";
import { CreateShelf } from "../controllers/shelfController.js";

async function findMany(userId: number) {
  const shelfBooks = await prisma.shelf.findMany({
    include: { book: true, rating: true },
    where: { userId },
  });
  return shelfBooks;
}

async function saveBook(bookInfos: CreateShelf) {
  return await prisma.shelf.create({ data: bookInfos });
}
const shelfRepository = {
  findMany,
  saveBook,
};
export default shelfRepository;
