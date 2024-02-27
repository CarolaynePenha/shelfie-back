import { prisma } from "../config/database.js";

async function findMany(userId) {
  const shelfBooks = await prisma.shelf.findMany({ where: { userId } });
  return shelfBooks;
}
const shelfRepository = {
  findMany,
};
export default shelfRepository;
