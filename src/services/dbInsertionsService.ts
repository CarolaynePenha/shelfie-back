import {
  CreateAuthors,
  CreateBooks,
  CreateCategories,
} from "../controllers/dbInsertionsController.js";
import dbInsertionsRepository from "../repositories/dbInsertionsRepository.js";

async function saveBooks(booksInfos: CreateBooks) {
  return await dbInsertionsRepository.postBooks(booksInfos);
}
async function saveAuthors(authorsInfos: CreateAuthors) {
  return await dbInsertionsRepository.postAuthors(authorsInfos);
}
async function saveCategories(categoriesInfos: CreateCategories) {
  return await dbInsertionsRepository.postCategories(categoriesInfos);
}

const dbInsertionsService = {
  saveBooks,
  saveAuthors,
  saveCategories,
};

export default dbInsertionsService;
