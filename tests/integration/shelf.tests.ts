import supertest from "supertest";
import app from "../../src/app.js";
import authFactory from "./factories/authFactory.js";
import { prisma } from "../../src/config/database.js";
import { BookStatus, BookType } from "@prisma/client";
import shelfFactory from "./factories/shelfFactory.js";

export default function shelfTests() {
  describe("shelf tests suite", () => {
    it("given shelf infos, post shelf", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      const user = await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const token = await authFactory.createSession(signInCredentials);
      const bookInfos = {
        bookId: 1,
        iHave: false,
        type: BookType.paper,
        status: BookStatus.done,
      };
      const response = await supertest(app)
        .post(`/shelf`)
        .send(bookInfos)
        .set("Authorization", `Bearer ${token}`);
      const shelf = await prisma.shelf.findFirst({
        where: { bookId: bookInfos.bookId, userId: user.id },
      });
      expect(response.body.id).toBe(shelf.id);
    });
    it("given  wrong shelf infos, return 422", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      const user = await authFactory.createUser(signUpCredentials);
      const signInCredentials = {
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      };
      const token = await authFactory.createSession(signInCredentials);
      const bookInfos = {
        bookId: 1,
        iHave: false,
        status: BookStatus.done,
      };
      const response = await supertest(app)
        .post(`/shelf`)
        .send(bookInfos)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(422);
    });
    it("get books in shelf", async () => {
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
          favorite: false,
        },
        {
          userId: user.id,
          bookId: 2,
          iHave: true,
          type: BookType.paper,
          status: BookStatus.done,
          favorite: false,
        },
      ];
      const firstShelf = await shelfFactory.saveinShelf(bookInfos[0]);
      const secondShelf = await shelfFactory.saveinShelf(bookInfos[1]);
      const response = await supertest(app)
        .get(`/shelf`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body[0].id).toBe(firstShelf.id);
      expect(response.body[1].id).toBe(secondShelf.id);
    });
    it("given shelf infos, update shelf", async () => {
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
        favorite: false,
      };

      await shelfFactory.saveinShelf(bookInfos);

      const infosToUpdate = {
        bookId: 1,
        iHave: true,
        type: BookType.paper,
        status: BookStatus.done,
      };
      await supertest(app)
        .put(`/shelf`)
        .send(infosToUpdate)
        .set("Authorization", `Bearer ${token}`);
      const shelf = await prisma.shelf.findFirst({
        where: { bookId: bookInfos.bookId, userId: user.id },
      });
      expect(shelf.iHave).toBe(infosToUpdate.iHave);
    });
    it("given wrong shelf update infos, return 422", async () => {
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
        favorite: false,
      };

      await shelfFactory.saveinShelf(bookInfos);

      const infosToUpdate = {
        iHave: true,
        type: BookType.paper,
        status: BookStatus.done,
      };
      const response = await supertest(app)
        .put(`/shelf`)
        .send(infosToUpdate)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(422);
    });
    it("update favorite books", async () => {
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
        favorite: false,
      };

      await shelfFactory.saveinShelf(bookInfos);

      const infosToUpdate = {
        bookId: 1,
        favorite: true,
      };
      await supertest(app)
        .put(`/shelf/favorite`)
        .send(infosToUpdate)
        .set("Authorization", `Bearer ${token}`);
      const shelf = await prisma.shelf.findFirst({
        where: { bookId: bookInfos.bookId, userId: user.id },
      });
      expect(shelf.favorite).toBe(infosToUpdate.favorite);
    });
    it("given wrong favorite books infos, return 422", async () => {
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
        favorite: false,
      };

      await shelfFactory.saveinShelf(bookInfos);

      const infosToUpdate = {
        bookId: 1,
      };
      const response = await supertest(app)
        .put(`/shelf/favorite`)
        .send(infosToUpdate)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(422);
    });
    it("get books in shelf by id", async () => {
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
          favorite: false,
        },
        {
          userId: user.id,
          bookId: 2,
          iHave: true,
          type: BookType.paper,
          status: BookStatus.done,
          favorite: false,
        },
      ];
      const firstShelf = await shelfFactory.saveinShelf(bookInfos[0]);
      await shelfFactory.saveinShelf(bookInfos[1]);
      const response = await supertest(app)
        .get(`/shelf/${firstShelf.bookId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.id).toBe(firstShelf.id);
    });
    it("get books metrics", async () => {
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
          favorite: false,
        },
        {
          userId: user.id,
          bookId: 2,
          iHave: true,
          type: BookType.paper,
          status: BookStatus.done,
          favorite: false,
        },
      ];
      await shelfFactory.saveinShelf(bookInfos[0]);
      await shelfFactory.saveinShelf(bookInfos[1]);
      const response = await supertest(app)
        .get(`/shelf/metrics`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).not.toBeNull();
      expect(response.body).not.toBeUndefined();
      expect(response.body.totalBooks).toBe(2);
    });
    it("delete book in shelf by id", async () => {
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
          favorite: false,
        },
        {
          userId: user.id,
          bookId: 2,
          iHave: true,
          type: BookType.paper,
          status: BookStatus.done,
          favorite: false,
        },
      ];
      const firstShelf = await shelfFactory.saveinShelf(bookInfos[0]);
      await shelfFactory.saveinShelf(bookInfos[1]);
      await supertest(app)
        .delete(`/shelf/${bookInfos[0].bookId}/${firstShelf.id}`)
        .set("Authorization", `Bearer ${token}`);
      const shelf = await prisma.shelf.findFirst({
        where: { bookId: bookInfos[0].bookId, userId: user.id },
      });
      expect(shelf).toBe(null);
    });
  });
}
