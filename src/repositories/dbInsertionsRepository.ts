import { prisma } from "../config/database.js";
import {
  CreateAuthors,
  CreateBooks,
  CreateCategories,
} from "../controllers/dbInsertionsController.js";

async function postBooks(booksInfos: CreateBooks) {
  return await prisma.book.upsert({
    where: {
      title_authorId: {
        title: booksInfos.title,
        authorId: booksInfos.authorId,
      },
    },
    update: {},
    create: booksInfos,
  });
}

async function postAuthors(authorsInfos: CreateAuthors) {
  return await prisma.author.upsert({
    where: { name: authorsInfos.name },
    update: {},
    create: {
      name: authorsInfos.name,
    },
  });
}

async function postCategories(categoriesInfos: CreateCategories) {
  return await prisma.category.upsert({
    where: { name: categoriesInfos.name },
    update: {},
    create: {
      name: categoriesInfos.name,
    },
  });
}
async function findMany(categoriesInfos: CreateCategories) {
  return await prisma.category.findMany({
    where: { name: categoriesInfos.name },
  });
}
const dbInsertionsRepository = {
  postBooks,
  postAuthors,
  postCategories,
  findMany,
};
export default dbInsertionsRepository;
