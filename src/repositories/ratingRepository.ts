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
async function updateRatingInfos(
  ids: CreateIds,
  ratingInfos: UpdateRatingInfos
) {
  return await prisma.rating.update({
    where: { shelfId: ratingInfos.shelfId },
    data: {
      stars: ratingInfos.stars,
      startDate: ratingInfos.startDate,
      endDate: ratingInfos.endDate,
    },
  });
}
const ratingRepository = {
  saveRating,
  findRating,
  updateRatingInfos,
};
export default ratingRepository;
