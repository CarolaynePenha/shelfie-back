import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import shelfRepository from "../../src/repositories/shelfRepository";
import shelfService from "../../src/services/shelfService";
import authRepository from "../../src/repositories/authRepository";
import bookRepository from "../../src/repositories/bookRepository";
import { BookStatus, BookType } from "@prisma/client";
import ratingRepository from "../../src/repositories/ratingRepository";

describe("shelf service unit test suite", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("getShelfBooks should call findMany function ", async () => {
    jest.spyOn(shelfRepository, "findMany").mockImplementationOnce((): any => {
      return null;
    });
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.noun(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    const userId = faker.number.int();
    await shelfService.getShelfBooks(undefined, userId, undefined);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findMany).toHaveBeenCalled();
  });
  it("getShelfBooks should throw notFoundError error", async () => {
    jest.spyOn(shelfRepository, "findMany").mockImplementationOnce((): any => {
      return null;
    });
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return;
        null;
      });
    const userId = faker.number.int();
    const promise = shelfService.getShelfBooks(undefined, userId, undefined);
    expect(promise).rejects.toEqual({
      message: "User does not exist",
      type: "notFound",
    });
  });
  it("postShelfBooks should throw badRequestError error ", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(bookRepository, "findBookById")
      .mockImplementationOnce((): any => {
        return {
          book: "book",
        };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });
    jest.spyOn(shelfRepository, "saveBook").mockImplementationOnce((): any => {
      return null;
    });
    const bookInfos = {
      favorite: true,
      iHave: false,
      type: BookType.paper,
      status: BookStatus.done,
      bookId: faker.number.int(),
      userId: faker.number.int(),
    };
    const promise = shelfService.postShelfBooks(bookInfos);
    expect(promise).rejects.toEqual({
      message: "Book already in the shelf",
      type: "badRequest",
    });
  });
  it("getShelfBooks should call findBooksBySrc function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBooksBySrc")
      .mockImplementationOnce((): any => {
        return null;
      });
    const src = faker.string.alphanumeric({ length: 3 });
    const userId = faker.number.int();
    await shelfService.getShelfBooks(src, userId, undefined);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBooksBySrc).toHaveBeenCalled();
  });
  it("getShelfBooks should call findBooksByCategory function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBooksByCategory")
      .mockImplementationOnce((): any => {
        return null;
      });
    const src = faker.string.alphanumeric({ length: 3 });
    const userId = faker.number.int();
    const filter = "categoria";
    await shelfService.getShelfBooks(src, userId, filter);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBooksByCategory).toHaveBeenCalled();
  });
  it("getShelfBooks should call findBooksByYear function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBooksByYear")
      .mockImplementationOnce((): any => {
        return null;
      });
    const src = faker.string.alphanumeric({ length: 3 });
    const userId = faker.number.int();
    const filter = "ano";
    await shelfService.getShelfBooks(src, userId, filter);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBooksByYear).toHaveBeenCalled();
  });
  it("getShelfBooks should call findBooksByStatus function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBooksByStatus")
      .mockImplementationOnce((): any => {
        return null;
      });
    const src = "done";
    const userId = faker.number.int();

    await shelfService.getShelfBooks(src, userId, undefined);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBooksByStatus).toHaveBeenCalled();
  });
  it("getShelfBooks should call findFavoritesBooks function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findFavoritesBooks")
      .mockImplementationOnce((): any => {
        return null;
      });
    const src = undefined;
    const userId = faker.number.int();
    const filter = "favorite";
    await shelfService.getShelfBooks(src, userId, filter);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findFavoritesBooks).toHaveBeenCalled();
  });

  it("postShelfBooks should call saveBook function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(bookRepository, "findBookById")
      .mockImplementationOnce((): any => {
        return {
          book: "book",
        };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest.spyOn(shelfRepository, "saveBook").mockImplementationOnce((): any => {
      return null;
    });
    const bookInfos = {
      favorite: true,
      iHave: false,
      type: BookType.paper,
      status: BookStatus.done,
      bookId: faker.number.int(),
      userId: faker.number.int(),
    };
    await shelfService.postShelfBooks(bookInfos);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(bookRepository.findBookById).toHaveBeenCalled();
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(shelfRepository.saveBook).toHaveBeenCalled();
  });
  it("deleteBook should call shelfRepository.deleteBook, and deleteRating functions", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });
    jest
      .spyOn(ratingRepository, "findRating")
      .mockImplementationOnce((): any => {
        return { rating: "rating" };
      });
    jest
      .spyOn(ratingRepository, "deleteRating")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(shelfRepository, "deleteBook")
      .mockImplementationOnce((): any => {
        return null;
      });
    const ids = {
      bookId: faker.number.int(),
      userId: faker.number.int(),
      shelfId: faker.number.int(),
    };
    await shelfService.deleteBook(ids);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(ratingRepository.findRating).toHaveBeenCalled();
    expect(ratingRepository.deleteRating).toHaveBeenCalled();
    expect(shelfRepository.deleteBook).toHaveBeenCalled();
  });
  it("deleteBook should call shelfRepository.deleteBook", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });
    jest
      .spyOn(ratingRepository, "findRating")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(ratingRepository, "deleteRating")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(shelfRepository, "deleteBook")
      .mockImplementationOnce((): any => {
        return null;
      });
    const ids = {
      bookId: faker.number.int(),
      userId: faker.number.int(),
      shelfId: faker.number.int(),
    };
    await shelfService.deleteBook(ids);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(ratingRepository.findRating).toHaveBeenCalled();
    expect(ratingRepository.deleteRating).not.toHaveBeenCalled();
    expect(shelfRepository.deleteBook).toHaveBeenCalled();
  });
  it("updatBook should call updateBookInfos function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });

    jest
      .spyOn(shelfRepository, "updateBookInfos")
      .mockImplementationOnce((): any => {
        return null;
      });
    const ids = {
      bookId: faker.number.int(),
      userId: faker.number.int(),
    };
    await shelfService.updatBook(ids);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(shelfRepository.updateBookInfos).toHaveBeenCalled();
  });
  it("updateFavoriteBook should call updateFavoriteBook function", async () => {
    jest
      .spyOn(authRepository, "findUserById")
      .mockImplementationOnce((): any => {
        return {
          id: faker.number.int(),
          createdAt: faker.date.recent(),
          name: faker.word.adverb(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image: faker.internet.url(),
        };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });

    jest
      .spyOn(shelfRepository, "updateFavoriteBook")
      .mockImplementationOnce((): any => {
        return null;
      });
    const updateInfos = {
      bookId: faker.number.int(),
      favorite: true,
    };
    const userId = faker.number.int();
    await shelfService.updateFavoriteBook(userId, updateInfos);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(shelfRepository.updateFavoriteBook).toHaveBeenCalled();
  });
  it("getMetrics should call getMetrics functions, and return an object with numbers", async () => {
    jest.spyOn(authRepository, "findUserById").mockImplementation((): any => {
      return {
        id: faker.number.int(),
        createdAt: faker.date.recent(),
        name: faker.word.adverb(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        image: faker.internet.url(),
      };
    });
    jest.spyOn(shelfRepository, "getMetrics").mockImplementation((): any => {
      return {
        _count: {
          status: 4,
        },
      };
    });
    jest
      .spyOn(shelfRepository, "getMetricsOfTotal")
      .mockImplementation((): any => {
        return {
          _count: {
            id: 5,
          },
        };
      });
    jest
      .spyOn(shelfRepository, "getMetricsOfFavorites")
      .mockImplementationOnce((): any => {
        return {
          _count: {
            favorite: 6,
          },
        };
      });
    jest
      .spyOn(shelfRepository, "getTotalOfReadingPages")
      .mockImplementationOnce((): any => {
        const pages = 120;
        return pages;
      });
    const userId = faker.number.int();
    const metrics = await shelfService.getMetrics(userId);
    expect(authRepository.findUserById).toHaveBeenCalled();
    expect(shelfRepository.getMetrics).toHaveBeenCalled();
    expect(shelfRepository.getMetricsOfTotal).toHaveBeenCalled();
    expect(shelfRepository.getMetricsOfFavorites).toHaveBeenCalled();
    expect(shelfRepository.getTotalOfReadingPages).toHaveBeenCalled();
    expect(metrics).toEqual({
      doneBooks: 4,
      abandonedBooks: 4,
      wishBooks: 4,
      totalBooks: 5,
      favoriteBooks: 6,
      totalPages: 120,
    });
  });
  it("findBookById should call findBookById function", async () => {
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });
    jest
      .spyOn(shelfRepository, "findBookById")
      .mockImplementationOnce((): any => {
        return null;
      });
    const ids = {
      bookId: faker.number.int(),
      userId: faker.number.int(),
    };
    await shelfService.findBookById(ids);
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(shelfRepository.findBookById).toHaveBeenCalled();
  });
  it("findBookById should throw badRequest error", async () => {
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(shelfRepository, "findBookById")
      .mockImplementationOnce((): any => {
        return null;
      });
    const ids = {
      bookId: faker.number.int(),
      userId: faker.number.int(),
    };
    const promise = shelfService.findBookById(ids);
    expect(promise).rejects.toEqual({
      message: "Book does not exist in the shelf",
      type: "badRequest",
    });
  });
});
