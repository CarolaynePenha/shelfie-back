import { prisma } from "../config/database.js";

async function findBookById(id: number) {
  const book = await prisma.$queryRaw`
 SELECT books.*, authors.*, shelf.*, ratings."startDate",ratings."endDate", AVG(ratings.stars) as totalStars
  FROM books
  JOIN authors ON books."authorId" = authors.id
  LEFT JOIN ratings ON books.id = ratings."bookId"
  LEFT JOIN shelf ON books.id = shelf."bookId"
  WHERE books.id = ${id}
  GROUP BY books.id, authors.id,shelf.id,ratings."startDate",ratings."endDate"
`;

  return book[0];
}

const bookRepository = {
  findBookById,
};

export default bookRepository;
