import { CreateRating } from "../controllers/ratingController.js";
import { badRequestError } from "../middlewares/handleErrorsMiddleware.js";
import ratingRepository from "../repositories/ratingRepository.js";
import bookService from "./bookService.js";
import shelfService, { CreateIds } from "./shelfService.js";

async function postRating(ratingInfos: CreateRating, userId: number) {
  await shelfService.userExist(userId);
  await bookService.bookExist(ratingInfos.bookId);
  const ids = { bookId: ratingInfos.bookId, userId };
  const shelfBookInfos = await shelfService.bookExistInShelf(ids, "needExist");
  await rantingExist(ids);
  statusConfirmation(shelfBookInfos.status);
  await ratingRepository.saveRating(ratingInfos);
  return;
}

async function rantingExist(ids: CreateIds) {
  const ranting = await ratingRepository.findRating(ids);
  if (ranting) {
    const message = "Book already rating";
    throw badRequestError(message);
  }
  return;
}

function statusConfirmation(status: string) {
  if (status !== "done") {
    const message = "Only books marked as done can be rating";
    throw badRequestError(message);
  }
  return;
}
const ratingService = {
  postRating,
};
export default ratingService;
