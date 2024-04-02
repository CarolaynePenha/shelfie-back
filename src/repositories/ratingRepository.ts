import { prisma } from "../config/database.js";
import { CreateRating } from "../controllers/ratingController.js";
import { UpdateRatingInfos } from "../services/ratingService.js";
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
async function updateRatingInfos(ratingInfos: UpdateRatingInfos) {
  return await prisma.rating.update({
    where: { shelfId: ratingInfos.shelfId },
    data: {
      stars: ratingInfos.stars,
      startDate: ratingInfos.startDate,
      endDate: ratingInfos.endDate,
    },
  });
}

async function deleteRating(shelfId: number) {
  return await prisma.rating.delete({
    where: { shelfId },
  });
}

async function deleteAll() {
  return await prisma.rating.deleteMany();
}
const ratingRepository = {
  saveRating,
  findRating,
  updateRatingInfos,
  deleteRating,
  deleteAll,
};
export default ratingRepository;
