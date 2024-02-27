import { prisma } from "../config/database.js";

async function getBooks(src: string) {
  const books = await prisma.book.findMany({
    include: {
      author: true,
    },
    where: {
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
  });
  return books;
}
const srcBarRepository = {
  getBooks,
};

export default srcBarRepository;
