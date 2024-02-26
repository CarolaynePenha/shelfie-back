import { prisma } from "../config/database.js";
import {
  CreateAuthors,
  CreateBooks,
  CreateCategories,
} from "../controllers/dbInsertionsController.js";

async function postBooks(booksInfos: CreateBooks) {
  return await prisma.book.createMany({ data: booksInfos });
}

async function postAuthors(authorsInfos: CreateAuthors) {
  return await prisma.author.createMany({ data: authorsInfos });
}

async function postCategories(categoriesInfos: CreateCategories) {
  return await prisma.category.createMany({ data: categoriesInfos });
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
