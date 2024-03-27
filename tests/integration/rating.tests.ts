import supertest from "supertest";
import app from "../../src/app.js";
import authFactory from "./factories/authFactory.js";
import { prisma } from "../../src/config/database.js";
import { BookStatus, BookType } from "@prisma/client";

export default function ratingTests() {
  describe("rating tests suite", () => {
    it("given rating infos, post rating", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      const user = await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const token = await authFactory.createSession(signInCredentials);
      const bookInfos = {
        userId: user.id,
        bookId: 1,
        iHave: false,
        type: BookType.paper,
        status: BookStatus.done,
      };
      const shelf = await prisma.shelf.create({ data: bookInfos });
      const ratingInfos = {
        bookId: 1,
        shelfId: shelf.id,
        stars: 3,
        startDate: "2024-02-25T21:37:57.000Z",
        endDate: "2024-03-08T21:38:03.000Z",
      };
      const response = await supertest(app)
        .post(`/rating`)
        .send(ratingInfos)
        .set("Authorization", `Bearer ${token}`);
      const rating = await prisma.rating.findFirst({
        where: { bookId: ratingInfos.bookId, shelf: { userId: user.id } },
      });
      expect(response.body.shelfId).toBe(rating.shelfId);
    });
    it("given wrong rating infos, return 422", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      const user = await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const bookInfos = {
        userId: user.id,
        bookId: 1,
        iHave: false,
        type: BookType.paper,
        status: BookStatus.done,
      };
      const shelf = await prisma.shelf.create({ data: bookInfos });
      const token = await authFactory.createSession(signInCredentials);
      const ratingInfos = {
        bookId: 1,
        shelfId: shelf.id,
        startDate: "2024-02-25T21:37:57.000Z",
        endDate: "2024-03-08T21:38:03.000Z",
      };
      const response = await supertest(app)
        .post(`/rating`)
        .send(ratingInfos)
        .set("Authorization", `Bearer ${token}`);
      const rating = await prisma.rating.findFirst({
        include: { shelf: true },
        where: { bookId: ratingInfos.bookId, shelf: { userId: user.id } },
      });
      expect(response.status).toBe(422);
    });
    it("given rating infos, update rating", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      const user = await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const token = await authFactory.createSession(signInCredentials);
      const bookInfos = [
        {
          userId: user.id,
          bookId: 1,
          iHave: false,
          type: BookType.paper,
          status: BookStatus.done,
        },
        {
          userId: user.id,
          bookId: 2,
          iHave: true,
          type: BookType.paper,
          status: BookStatus.done,
        },
      ];
      const firstShelf = await prisma.shelf.create({ data: bookInfos[0] });
      const secondShelf = await prisma.shelf.create({ data: bookInfos[1] });
      const ratingInfos = [
        {
          bookId: 1,
          shelfId: firstShelf.id,
          stars: 3,
          startDate: "2024-02-25T21:37:57.000Z",
          endDate: "2024-03-08T21:38:03.000Z",
        },
        {
          bookId: 2,
          shelfId: secondShelf.id,
          stars: 5,
          startDate: "2024-02-25T21:37:57.000Z",
          endDate: "2024-03-08T21:38:03.000Z",
        },
      ];

      await prisma.rating.createMany({ data: ratingInfos });

      const infosToUpdate = {
        bookId: 1,
        shelfId: firstShelf.id,
        stars: 2,
        startDate: "2024-02-25T21:37:57.000Z",
        endDate: "2024-03-08T21:38:03.000Z",
      };

      await supertest(app)
        .put(`/rating`)
        .send(infosToUpdate)
        .set("Authorization", `Bearer ${token}`);

      const rating = await prisma.rating.findFirst({
        where: { bookId: infosToUpdate.bookId, shelf: { userId: user.id } },
      });
      expect(infosToUpdate.stars).toBe(rating.stars);
    });
    it("given wrong rating infos, return 422", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      const user = await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const token = await authFactory.createSession(signInCredentials);
      const bookInfos = [
        {
          userId: user.id,
          bookId: 1,
          iHave: false,
          type: BookType.paper,
          status: BookStatus.done,
        },
        {
          userId: user.id,
          bookId: 2,
          iHave: true,
          type: BookType.paper,
          status: BookStatus.done,
        },
      ];
      const firstShelf = await prisma.shelf.create({ data: bookInfos[0] });
      const secondShelf = await prisma.shelf.create({ data: bookInfos[1] });
      const ratingInfos = [
        {
          bookId: 1,
          shelfId: firstShelf.id,
          stars: 3,
          startDate: "2024-02-25T21:37:57.000Z",
          endDate: "2024-03-08T21:38:03.000Z",
        },
        {
          bookId: 2,
          shelfId: secondShelf.id,
          stars: 5,
          startDate: "2024-02-25T21:37:57.000Z",
          endDate: "2024-03-08T21:38:03.000Z",
        },
      ];

      await prisma.rating.createMany({ data: ratingInfos });

      const infosToUpdate = {
        bookId: 1,
        stars: 2,
        startDate: "2024-02-25T21:37:57.000Z",
        endDate: "2024-03-08T21:38:03.000Z",
      };

      const response = await supertest(app)
        .put(`/rating`)
        .send(infosToUpdate)
        .set("Authorization", `Bearer ${token}`);

      const rating = await prisma.rating.findFirst({
        where: { bookId: infosToUpdate.bookId, shelf: { userId: user.id } },
      });
      expect(response.status).toBe(422);
    });
  });
}
