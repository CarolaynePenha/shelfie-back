import { array } from "joi";
import {
  CreateAuthors,
  CreateBooks,
  CreateCategories,
} from "../controllers/dbInsertionsController.js";
import dbInsertionsRepository from "../repositories/dbInsertionsRepository.js";

async function saveBooks(booksInfos: CreateBooks) {
  return await dbInsertionsRepository.postBooks(booksInfos);
}
async function saveAuthors(authorsInfos: CreateAuthors | CreateAuthors[]) {
  if (Array.isArray(authorsInfos)) {
    return await Promise.all(
      authorsInfos.map((author) => dbInsertionsRepository.postAuthors(author))
    );
  } else {
    return await dbInsertionsRepository.postAuthors(authorsInfos);
  }
}
async function saveCategories(
  categoriesInfos: CreateCategories | CreateCategories[]
) {
  if (Array.isArray(categoriesInfos)) {
    return await Promise.all(
      categoriesInfos.map((category) =>
        dbInsertionsRepository.postCategories(category)
      )
    );
  } else {
    return await dbInsertionsRepository.postCategories(categoriesInfos);
  }
}

const dbInsertionsService = {
  saveBooks,
  saveAuthors,
  saveCategories,
};

export default dbInsertionsService;
