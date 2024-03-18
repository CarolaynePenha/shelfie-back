import { prisma } from "../config/database.js";

async function findBookById(id: number) {
  const book = await prisma.$queryRaw`
 SELECT books.*, authors.name, AVG(ratings.stars) as totalStars
  FROM books
  JOIN authors ON books."authorId" = authors.id
  LEFT JOIN ratings ON books.id = ratings."bookId"
  WHERE books.id = ${id}
  GROUP BY books.id, authors.id
`;

  return book[0];
}
async function getRanking() {
  const books = await prisma.$queryRaw`
  SELECT AVG(ratings.stars) as "avgStars", books.*
FROM ratings
JOIN books ON books.id = ratings."bookId"
GROUP BY books.id
ORDER BY "avgStars" DESC
LIMIT 10;
  `;
  return books;
}

async function getTotalOfRankings() {
  const books = await prisma.rating.groupBy({
    by: ["bookId"],
    _count: {
      id: true,
    },
  });
  return books;
}

async function getMetricDone(bookId: number) {
  const metrics = await prisma.shelf.aggregate({
    where: {
      bookId,
      status: "done",
    },
    _count: { status: true },
  });
  return metrics;
}
async function getMetricWish(bookId: number) {
  const metrics = await prisma.shelf.aggregate({
    where: {
      bookId,
      status: "wish",
    },
    _count: { status: true },
  });
  return metrics;
}
async function getMetricReading(bookId: number) {
  const metrics = await prisma.shelf.aggregate({
    where: {
      bookId,
      status: "reading",
    },
    _count: { status: true },
  });
  return metrics;
}

const bookRepository = {
  findBookById,
  getRanking,
  getTotalOfRankings,
  getMetricDone,
  getMetricWish,
  getMetricReading,
};

export default bookRepository;
