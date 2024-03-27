import supertest from "supertest";
import app from "../../src/app.js";
import authFactory from "./factories/authFactory.js";
import { prisma } from "../../src/config/database.js";
import { BookStatus, BookType } from "@prisma/client";

export default function bookTests() {
  describe("book tests suite", () => {
    it("given book id, get book", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const token = await authFactory.createSession(signInCredentials);
      const response = await supertest(app)
        .get(`/book/1`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.body.title).toBe("O cemitério");
    });
    it("given  wrong book id, returns 404", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const token = await authFactory.createSession(signInCredentials);
      const response = await supertest(app)
        .get(`/book/1005`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("get ranking", async () => {
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

      const response = await supertest(app)
        .get(`/ranking`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.body[0].id).toBe(ratingInfos[1].bookId);
    });
  });
}
