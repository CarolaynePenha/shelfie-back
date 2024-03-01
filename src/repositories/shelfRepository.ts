import { BookStatus } from "@prisma/client";
import { prisma } from "../config/database.js";
import { CreateShelf } from "../controllers/shelfController.js";
import { CreateIds } from "../services/shelfService.js";

async function findMany(userId: number) {
  const shelfBooks = await prisma.shelf.findMany({
    include: { book: { include: { rating: true } } },
    where: { userId },
  });
  return shelfBooks;
}

async function findBooksBySrc(src: string, userId: number) {
  const shelfbooks = await prisma.shelf.findMany({
    include: { book: { include: { rating: true, author: true } } },
    where: {
      userId,
      book: {
        OR: [
          {
            title: {
              contains: src,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: src,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    },
  });
  return shelfbooks;
}

async function findBooksByCategory(category: string, userId: number) {
  const shelfbooks = await prisma.shelf.findMany({
    include: { book: { include: { rating: true, author: true } } },
    where: {
      userId,
      book: {
        category: {
          name: { contains: category, mode: "insensitive" },
        },
      },
    },
  });
  return shelfbooks;
}
async function findBooksByStatus(status: BookStatus, userId: number) {
  const shelfbooks = await prisma.shelf.findMany({
    include: { book: { include: { rating: true, author: true } } },
    where: {
      userId,
      status: status,
    },
  });
  return shelfbooks;
}
async function findBooksByYear(year: string, userId: number) {
  const shelfbooks = await prisma.shelf.findMany({
    include: { book: { include: { rating: true, author: true } } },
    where: {
      userId,
      rating: {
        some: {
          endDate: {
            gte: new Date(Number(year), 0, 1),
            lt: new Date(Number(year) + 1, 0, 1),
          },
        },
      },
    },
  });
  return shelfbooks;
}

async function saveBook(bookInfos: CreateShelf) {
  return await prisma.shelf.create({ data: bookInfos });
}

async function findBookShelfById(ids: CreateIds) {
  const book = await prisma.shelf.findFirst({
    where: { bookId: ids.bookId, userId: ids.userId },
  });
  return book;
}
const shelfRepository = {
  findMany,
  saveBook,
  findBookShelfById,
  findBooksBySrc,
  findBooksByCategory,
  findBooksByYear,
  findBooksByStatus,
};
export default shelfRepository;
