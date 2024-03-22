import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import shelfService from "../../src/services/shelfService";
import bookService from "../../src/services/bookService";
import { BookStatus, BookType } from "@prisma/client";
import ratingRepository from "../../src/repositories/ratingRepository";
import ratingService from "../../src/services/ratingService";

describe("rating service unit test suite", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("postRating should call saveRating", async () => {
    jest.spyOn(shelfService, "userExist").mockImplementationOnce((): any => {
      return null;
    });
    jest.spyOn(bookService, "bookExist").mockImplementationOnce((): any => {
      return null;
    });
    jest
      .spyOn(shelfService, "bookExistInShelf")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          iHave: true,
          type: BookType.ebook,
          status: BookStatus.done,
          bookId: faker.number.int(),
          userId: faker.number.int(),
          favorite: false,
        };
      });
    jest
      .spyOn(ratingRepository, "findRating")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(ratingRepository, "saveRating")
      .mockImplementationOnce((): any => {
        return null;
      });

    const ratingInfos = {
      bookId: faker.number.int(),
      stars: faker.number.float(),
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      shelfId: faker.number.int(),
    };
    const userId = faker.number.int();
    await ratingService.postRating(ratingInfos, userId);
    expect(shelfService.userExist).toHaveBeenCalled();
    expect(bookService.bookExist).toHaveBeenCalled();
    expect(shelfService.bookExistInShelf).toHaveBeenCalled();
    expect(ratingRepository.findRating).toHaveBeenCalled();
    expect(ratingRepository.saveRating).toHaveBeenCalled();
  });
  it("postRating should throw badRequestError", async () => {
    jest.spyOn(shelfService, "userExist").mockImplementationOnce((): any => {
      return null;
    });
    jest.spyOn(bookService, "bookExist").mockImplementationOnce((): any => {
      return null;
    });
    jest
      .spyOn(shelfService, "bookExistInShelf")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          iHave: true,
          type: BookType.ebook,
          status: BookStatus.done,
          bookId: faker.number.int(),
          userId: faker.number.int(),
          favorite: false,
        };
      });
    jest
      .spyOn(ratingRepository, "findRating")
      .mockImplementationOnce((): any => {
        return { rating: "rating" };
      });

    const ratingInfos = {
      bookId: faker.number.int(),
      stars: faker.number.float(),
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      shelfId: faker.number.int(),
    };
    const userId = faker.number.int();
    const promise = ratingService.postRating(ratingInfos, userId);
    expect(promise).rejects.toEqual({
      message: "Book already rated",
      type: "badRequest",
    });
  });
  it("postRating should throw badRequestError,if status other than done ", async () => {
    jest.spyOn(shelfService, "userExist").mockImplementationOnce((): any => {
      return null;
    });
    jest.spyOn(bookService, "bookExist").mockImplementationOnce((): any => {
      return null;
    });
    jest
      .spyOn(shelfService, "bookExistInShelf")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          iHave: true,
          type: BookType.ebook,
          status: BookStatus.reading,
          bookId: faker.number.int(),
          userId: faker.number.int(),
          favorite: false,
        };
      });
    jest
      .spyOn(ratingRepository, "findRating")
      .mockImplementationOnce((): any => {
        return null;
      });

    const ratingInfos = {
      bookId: faker.number.int(),
      stars: faker.number.float(),
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      shelfId: faker.number.int(),
    };
    const userId = faker.number.int();
    const promise = ratingService.postRating(ratingInfos, userId);
    expect(promise).rejects.toEqual({
      message: "Only books marked as done can be rating",
      type: "badRequest",
    });
  });
  it("updateRating should call updateRatingInfos", async () => {
    jest.spyOn(shelfService, "userExist").mockImplementationOnce((): any => {
      return null;
    });
    jest
      .spyOn(ratingRepository, "findRating")
      .mockImplementationOnce((): any => {
        return { rating: "rating" };
      });
    jest
      .spyOn(ratingRepository, "updateRatingInfos")
      .mockImplementationOnce((): any => {
        return null;
      });

    const ratingInfos = {
      stars: faker.number.float(),
      startDate: faker.string.numeric(),
      endDate: faker.string.numeric(),
      shelfId: faker.number.int(),
      bookId: faker.number.int(),
      userId: faker.number.int(),
    };
    await ratingService.updateRating(ratingInfos);
    expect(shelfService.userExist).toHaveBeenCalled();
    expect(ratingRepository.findRating).toHaveBeenCalled();
    expect(ratingRepository.updateRatingInfos).toHaveBeenCalled();
  });
  it("updateRating should throw badRequestError", async () => {
    jest.spyOn(shelfService, "userExist").mockImplementationOnce((): any => {
      return null;
    });
    jest
      .spyOn(ratingRepository, "findRating")
      .mockImplementationOnce((): any => {
        return null;
      });

    const ratingInfos = {
      stars: faker.number.float(),
      startDate: faker.string.numeric(),
      endDate: faker.string.numeric(),
      shelfId: faker.number.int(),
      bookId: faker.number.int(),
      userId: faker.number.int(),
    };
    const promise = ratingService.updateRating(ratingInfos);
    expect(promise).rejects.toEqual({
      message: "Book does not rated ",
      type: "badRequest",
    });
  });
});
