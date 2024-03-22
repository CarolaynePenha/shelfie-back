import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import shelfRepository from "../../src/repositories/shelfRepository";
import bookRepository from "../../src/repositories/bookRepository";
import bookService from "../../src/services/bookService";

describe("book service unit test suite", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("findBookById should return null status ", async () => {
    jest
      .spyOn(bookRepository, "findBookById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(bookRepository, "getMetricDone")
      .mockImplementationOnce((): any => {
        return {
          _count: {
            status: 2,
          },
        };
      });
    jest
      .spyOn(bookRepository, "getMetricWish")
      .mockImplementationOnce((): any => {
        return {
          _count: {
            status: 2,
          },
        };
      });
    jest
      .spyOn(bookRepository, "getMetricReading")
      .mockImplementationOnce((): any => {
        return {
          _count: {
            status: 2,
          },
        };
      });

    const ids = {
      shelfId: faker.number.int(),
      userId: faker.number.int(),
      bookId: faker.number.int(),
    };
    const book = await bookService.findBookById(ids);
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(bookRepository.getMetricDone).toHaveBeenCalled();
    expect(bookRepository.getMetricWish).toHaveBeenCalled();
    expect(bookRepository.getMetricReading).toHaveBeenCalled();
    expect(book.status).toBeNull();
  });
  it("findBookById should return not null status ", async () => {
    jest
      .spyOn(bookRepository, "findBookById")
      .mockImplementationOnce((): any => {
        return { book: "book" };
      });
    jest
      .spyOn(shelfRepository, "findBookShelfById")
      .mockImplementationOnce((): any => {
        return { status: "done" };
      });
    jest
      .spyOn(bookRepository, "getMetricDone")
      .mockImplementationOnce((): any => {
        return {
          _count: {
            status: 2,
          },
        };
      });
    jest
      .spyOn(bookRepository, "getMetricWish")
      .mockImplementationOnce((): any => {
        return {
          _count: {
            status: 2,
          },
        };
      });
    jest
      .spyOn(bookRepository, "getMetricReading")
      .mockImplementationOnce((): any => {
        return {
          _count: {
            status: 2,
          },
        };
      });

    const ids = {
      shelfId: faker.number.int(),
      userId: faker.number.int(),
      bookId: faker.number.int(),
    };
    const book = await bookService.findBookById(ids);
    expect(shelfRepository.findBookShelfById).toHaveBeenCalled();
    expect(bookRepository.getMetricDone).toHaveBeenCalled();
    expect(bookRepository.getMetricWish).toHaveBeenCalled();
    expect(bookRepository.getMetricReading).toHaveBeenCalled();
    expect(book.status).not.toBeNull();
  });
  it("findBookById should throw notFoundError error ", async () => {
    jest
      .spyOn(bookRepository, "findBookById")
      .mockImplementationOnce((): any => {
        return null;
      });

    const ids = {
      shelfId: faker.number.int(),
      userId: faker.number.int(),
      bookId: faker.number.int(),
    };
    const promise = bookService.findBookById(ids);

    expect(promise).rejects.toEqual({
      message: "Book not found",
      type: "notFound",
    });
  });
  it("getRanking should return book", async () => {
    jest.spyOn(bookRepository, "getRanking").mockImplementationOnce((): any => {
      return { book: "book" };
    });
    jest
      .spyOn(bookRepository, "getTotalOfRankings")
      .mockImplementationOnce((): any => {
        return null;
      });

    const book = await bookService.getRanking();
    expect(bookRepository.getRanking).toHaveBeenCalled();
    expect(bookRepository.getTotalOfRankings).toHaveBeenCalled();
    expect(book).toEqual({ book: "book" });
  });
  it("getRanking should return booksWithTotal", async () => {
    jest.spyOn(bookRepository, "getRanking").mockImplementationOnce((): any => {
      return [
        {
          avgStars: 4.25,
          id: 11,
          createdAt: "2024-02-28T14:25:38.588Z",
          title:
            "A serpente e as asas feitas de noite: Livro 1 da duologia Nascidos da Noite (Coroas de Nyaxia)",
          synopsis:
            "Para humanos e vampiros, as regras são as mesmas: nunca confie em ninguém, nunca ceda e sempre — sempre — proteja seu coração. .",
          totalPages: 645,
          preSale: false,
          release: false,
          authorId: 4,
          bookImage:
            "https://m.media-amazon.com/images/I/81npNlBT6zL._SY466_.jpg",
          categoryId: 1,
        },
        {
          avgStars: 2.5,
          id: 13,
          createdAt: "2024-02-28T14:46:20.236Z",
          title: "O cemitério",
          synopsis:
            "Louis Creed, um jovem médico de Chicago, acredita que encontrou seu lugar em uma pequena cidade do Maine",
          totalPages: 424,
          preSale: false,
          release: false,
          authorId: 2,
          bookImage:
            "https://m.media-amazon.com/images/I/8151ymQnnuL._SY466_.jpg",
          categoryId: 7,
        },
      ];
    });
    jest
      .spyOn(bookRepository, "getTotalOfRankings")
      .mockImplementationOnce((): any => {
        return [
          { _count: { id: 2 }, bookId: 11 },
          { _count: { id: 1 }, bookId: 13 },
          { _count: { id: 3 }, bookId: 9 },
        ];
      });

    const book = await bookService.getRanking();
    expect(bookRepository.getRanking).toHaveBeenCalled();
    expect(bookRepository.getTotalOfRankings).toHaveBeenCalled();
    expect(book[0].totalOfRankings).toEqual(2);
  });
});
