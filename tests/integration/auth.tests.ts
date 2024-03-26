import supertest from "supertest";
import { prisma } from "../../src/config/database.js";
import app from "../../src/app.js";
import authFactory from "./factories/authFactory.js";

export default function authTests() {
  describe("auth tests suite", () => {
    it("given email and password,create user", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      const response = await supertest(app)
        .post("/signUp")
        .send(signUpCredentials);
      expect(response.status).toBe(201);
      const user = await prisma.user.findFirst({
        where: { email: signUpCredentials.email.toLowerCase() },
      });
      expect(user.email).toBe(signUpCredentials.email.toLowerCase());
    });
    it("given an invalid input,returns 422", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      delete signUpCredentials.password;
      const response = await supertest(app)
        .post("/signUp")
        .send(signUpCredentials);
      expect(response.status).toBe(422);
    });
    it("given email and password,login", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      await authFactory.createUser(signUpCredentials);
      const response = await supertest(app).post("/signIn").send({
        password: signUpCredentials.password,
        email: signUpCredentials.email,
      });
      expect(response.body.token).not.toBeNull();
      expect(response.body.token).not.toBeUndefined();
      const session = await prisma.session.findFirst({
        where: { token: response.body.token },
      });
      expect(session).not.toBeNull();
      expect(session).not.toBeUndefined();
    });
    it("given an invalid password,returns 401", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      await authFactory.createUser(signUpCredentials);
      const wrongSignInCredentials = {
        email: signUpCredentials.email,
        password: "Aluno564!!",
      };
      const response = await supertest(app)
        .post("/signIn")
        .send(wrongSignInCredentials);
      expect(response.status).toBe(401);
    });
    it("given an invalid email,returns 401", async () => {
      const signUpCredentials = authFactory.createSignUpBody();
      await authFactory.createUser(signUpCredentials);
      const wrongSignInCredentials = {
        password: signUpCredentials.password,
        email: "Aluno4565@gmail.com",
      };
      const response = await supertest(app)
        .post("/signIn")
        .send(wrongSignInCredentials);
      expect(response.status).toBe(401);
    });
  });
}
