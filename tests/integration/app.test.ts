import { prisma } from "../../src/config/database.js";
import authTests from "./auth.tests.js";
import bookTests from "./book.tests.js";
import ratingTests from "./rating.tests.js";
import shelfTests from "./shelf.tests.js";
import srcTests from "./src.tests.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM ratings`;
  await prisma.$executeRaw`DELETE FROM shelf`;
  await prisma.$executeRaw`DELETE FROM sessions`;
  await prisma.$executeRaw`DELETE FROM users`;
});
authTests();
bookTests();
ratingTests();
shelfTests();
srcTests();

afterAll(async () => {
  await prisma.$disconnect();
});
