import { prisma } from "../../../src/config/database";
import { CreateShelf } from "../../../src/controllers/shelfController";

async function saveinShelf(bookInfos: CreateShelf) {
  return await prisma.shelf.create({ data: bookInfos });
}
const shelfFactory = {
  saveinShelf,
};
export default shelfFactory;
