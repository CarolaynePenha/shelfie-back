import { BookStatus } from "@prisma/client";
import { prisma } from "../config/database.js";
import { CreateShelf } from "../controllers/shelfController.js";
import { CreateIds, UpdateBookInfos } from "../services/shelfService.js";

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
async function findFavoritesBooks(userId: number) {
  const shelfbooks = await prisma.shelf.findMany({
    include: { book: { include: { rating: true, author: true } } },
    where: {
      userId,
      favorite: true,
    },
  });
  return shelfbooks;
}

async function getMetrics(userId: number, status: BookStatus) {
  const metrics = await prisma.shelf.aggregate({
    where: {
      userId,
      status,
    },
    _count: { status: true },
  });
  return metrics;
}

async function getMetricsOfTotal(userId: number) {
  const metrics = await prisma.shelf.aggregate({
    where: {
      userId,
    },
    _count: { id: true },
  });
  return metrics;
}
async function getMetricsOfFavorites(userId: number) {
  const metrics = await prisma.shelf.aggregate({
    where: {
      userId,
      favorite: true,
    },
    _count: { favorite: true },
  });
  return metrics;
}

async function getTotalOfReadingPages(userId: number) {
  const metrics = await prisma.$queryRaw`
  
  SELECT  SUM(books."totalPages") as total
   FROM books
   JOIN shelf ON books.id = shelf."bookId"
   WHERE shelf."userId" = ${userId}
   AND shelf.status= 'done' `;
  const totalPages = parseInt(metrics[0].total) || 0;
  return totalPages;
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
async function updateBookInfos(ids: CreateIds, bookInfos: UpdateBookInfos) {
  return await prisma.shelf.update({
    where: { bookId_userId: ids },
    data: {
      iHave: bookInfos.iHave,
      type: bookInfos.type,
      status: bookInfos.status,
    },
  });
}

async function updateFavoriteBook(ids: CreateIds, favorite: boolean) {
  return await prisma.shelf.update({
    where: { bookId_userId: ids },
    data: {
      favorite,
    },
  });
}

async function deleteBook(ids: CreateIds) {
  delete ids.shelfId;
  return await prisma.shelf.delete({
    where: { bookId_userId: ids },
  });
}

async function deleteAll() {
  return await prisma.shelf.deleteMany();
}

async function findBookById(ids: CreateIds) {
  const book = await prisma.$queryRaw`
 SELECT books.*, authors.*, shelf.*, ratings."startDate",ratings."endDate", ratings.id as "ratingId", AVG(ratings.stars) as totalStars
  FROM books
  JOIN authors ON books."authorId" = authors.id
  JOIN shelf ON books.id = shelf."bookId"
  LEFT JOIN ratings ON ratings."shelfId"=shelf.id
  WHERE books.id = ${ids.bookId}
  AND shelf."userId"=${ids.userId}
  GROUP BY books.id, authors.id,shelf.id,ratings."startDate",ratings."endDate",ratings.id
`;

  return book[0];
}
const shelfRepository = {
  findMany,
  saveBook,
  findBookShelfById,
  findBooksBySrc,
  findBooksByCategory,
  findBooksByYear,
  findBooksByStatus,
  findFavoritesBooks,
  deleteBook,
  updateBookInfos,
  getMetrics,
  getMetricsOfTotal,
  getMetricsOfFavorites,
  getTotalOfReadingPages,
  updateFavoriteBook,
  findBookById,
  deleteAll,
};
export default shelfRepository;
