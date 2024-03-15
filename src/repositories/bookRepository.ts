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

const bookRepository = {
  findBookById,
};

export default bookRepository;
