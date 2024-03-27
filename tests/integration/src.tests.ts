import supertest from "supertest";
import app from "../../src/app.js";
import authFactory from "./factories/authFactory.js";
import { BookStatus, BookType } from "@prisma/client";
import shelfFactory from "./factories/shelfFactory.js";

export default function srcTests() {
  describe("src tests suite", () => {
    it("given src infos, get src", async () => {
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
        .get(`/srcBar?src=cemi`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body[0].title).toBe("O cemitério");
    });
  });
}
