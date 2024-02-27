import { prisma } from "../config/database.js";

async function findBookById(id: number) {
  const book = await prisma.book.findFirst({ where: { id } });
  return book;
}

const bookRepository = {
  findBookById,
};

export default bookRepository;
