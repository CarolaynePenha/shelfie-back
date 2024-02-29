import { prisma } from "../config/database.js";
import { CreateRating } from "../controllers/ratingController.js";
import { CreateIds } from "../services/shelfService.js";

async function saveRating(ratingInfos: CreateRating) {
  return await prisma.rating.create({ data: ratingInfos });
}
async function findRating(ids: CreateIds) {
  return await prisma.rating.findFirst({
    include: { shelf: true },
    where: { bookId: ids.bookId, shelf: { userId: ids.userId } },
  });
}
const ratingRepository = {
  saveRating,
  findRating,
};
export default ratingRepository;
