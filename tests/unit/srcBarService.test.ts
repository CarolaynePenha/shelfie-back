import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import srcBarRepository from "../../src/repositories/srcBarRepository";
import shelfRepository from "../../src/repositories/shelfRepository";
import srcBarService from "../../src/services/srcBarService";

describe("srcBar service unit test suite", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("getSrcBooks should return book with status ", async () => {
    jest.spyOn(srcBarRepository, "getBooks").mockImplementationOnce((): any => {
      return [
        {
          id: 9,
          createdAt: "2024-02-27T21:57:40.381Z",
          title: "Trono de vidro (Vol. 1)",
          synopsis:
            "A magia há muito abandonou Adarlan.  Um perverso rei governa, punindo impiedosamente as minorias rebeldes.",
          totalPages: 392,
          preSale: false,
          release: false,
          authorId: 1,
          bookImage:
            "https://m.media-amazon.com/images/I/81f1oA6voPL._AC_UL320_.jpg",
          categoryId: 1,
          author: { id: 1, name: "Sarah J. Maas" },
        },
      ];
    });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return {
          id: 61,
          createdAt: "2024-03-15T22:28:41.794Z",
          iHave: true,
          type: "paper",
          status: "done",
          bookId: 9,
          userId: 2,
          favorite: false,
        };
      });

    const src = "trono";
    const userId = faker.number.int();
    const booksWithStatusArr = await srcBarService.getSrcBooks(src, userId);
    const bookExpectReturn = [
      {
        id: 9,
        createdAt: "2024-02-27T21:57:40.381Z",
        title: "Trono de vidro (Vol. 1)",
        synopsis:
          "A magia há muito abandonou Adarlan.  Um perverso rei governa, punindo impiedosamente as minorias rebeldes.",
        totalPages: 392,
        preSale: false,
        release: false,
        authorId: 1,
        bookImage:
          "https://m.media-amazon.com/images/I/81f1oA6voPL._AC_UL320_.jpg",
        categoryId: 1,
        author: {
          id: 1,
          name: "Sarah J. Maas",
        },
        status: "done",
      },
    ];
    expect(booksWithStatusArr).toEqual(bookExpectReturn);
  });
  it("getSrcBooksshould return book without status ", async () => {
    jest.spyOn(srcBarRepository, "getBooks").mockImplementationOnce((): any => {
      return [
        {
          id: 9,
          createdAt: "2024-02-27T21:57:40.381Z",
          title: "Trono de vidro (Vol. 1)",
          synopsis:
            "A magia há muito abandonou Adarlan.  Um perverso rei governa, punindo impiedosamente as minorias rebeldes.",
          totalPages: 392,
          preSale: false,
          release: false,
          authorId: 1,
          bookImage:
            "https://m.media-amazon.com/images/I/81f1oA6voPL._AC_UL320_.jpg",
          categoryId: 1,
          author: { id: 1, name: "Sarah J. Maas" },
        },
      ];
    });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return null;
      });

    const src = "trono";
    const userId = faker.number.int();
    const booksWithStatusArr = await srcBarService.getSrcBooks(src, userId);
    const bookExpectReturn = [
      {
        id: 9,
        createdAt: "2024-02-27T21:57:40.381Z",
        title: "Trono de vidro (Vol. 1)",
        synopsis:
          "A magia há muito abandonou Adarlan.  Um perverso rei governa, punindo impiedosamente as minorias rebeldes.",
        totalPages: 392,
        preSale: false,
        release: false,
        authorId: 1,
        bookImage:
          "https://m.media-amazon.com/images/I/81f1oA6voPL._AC_UL320_.jpg",
        categoryId: 1,
        author: {
          id: 1,
          name: "Sarah J. Maas",
        },
        status: null,
      },
    ];
    expect(booksWithStatusArr).toEqual(bookExpectReturn);
  });
});
