import { CreateRating } from "../controllers/ratingController.js";
import { badRequestError } from "../middlewares/handleErrorsMiddleware.js";
import ratingRepository from "../repositories/ratingRepository.js";
import bookService from "./bookService.js";
import shelfService, { CreateIds } from "./shelfService.js";

export interface UpdateRatingInfos {
  stars?: number;
  startDate?: string;
  endDate?: string;
  shelfId: number;
  bookId: number;
  userId: number;
}

async function postRating(ratingInfos: CreateRating, userId: number) {
  await shelfService.userExist(userId);
  await bookService.bookExist(ratingInfos.bookId);
  const ids = { bookId: ratingInfos.bookId, userId };
  const shelfBookInfos = await shelfService.bookExistInShelf(ids, "needExist");
  await rantingExist(ids);
  statusConfirmation(shelfBookInfos.status);
  const rating = await ratingRepository.saveRating(ratingInfos);
  return rating;
}

async function rantingExist(ids: CreateIds, exist?: string) {
  const ranting = await ratingRepository.findRating(ids);
  if (exist === "needExist") {
    if (!ranting) {
      const message = "Book does not rated ";
      throw badRequestError(message);
    }
    return;
  } else {
    if (ranting) {
      const message = "Book already rated";
      throw badRequestError(message);
    }
    return;
  }
}

function statusConfirmation(status: string) {
  if (status !== "done") {
    const message = "Only books marked as done can be rating";
    throw badRequestError(message);
  }
  return;
}

async function updateRating(ratingInfos: UpdateRatingInfos) {
  const ids = { bookId: ratingInfos.bookId, userId: ratingInfos.userId };
  await shelfService.userExist(ids.userId);
  await rantingExist(ids, "needExist");
  await ratingRepository.updateRatingInfos(ratingInfos);
}
const ratingService = {
  postRating,
  updateRating,
};
export default ratingService;
