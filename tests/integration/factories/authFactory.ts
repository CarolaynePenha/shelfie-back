import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import supertest from "supertest";
import app from "../../../src/app.js";
import { prisma } from "../../../src/config/database.js";
import { CreateUser } from "../../../src/controllers/authController.js";
import { User } from "@prisma/client";

export type CreateSessionWithPassword = Omit<
  User,
  "id" | "createdAt" | "name" | "image"
>;

function createSignUpBody() {
  const fakeCapitalLetter = faker.internet.password({
    pattern: /(?=.*[A-Z])/,
    length: 2,
  });
  const fakeLowerCase = faker.internet.password({
    pattern: /(?=.*[a-z])/,
    length: 5,
  });
  const fakeDigs = faker.internet.password({
    pattern: /(?=.*\d)/,
    length: 2,
  });
  const fakeChars = faker.internet.password({
    pattern: /(?=.*[@$!%*?&])/,
    length: 5,
  });
  const signUpInfos = {
    name: faker.word.noun(),
    email: faker.internet.email(),
    password: fakeCapitalLetter + fakeLowerCase + fakeDigs + fakeChars,
    image: faker.image.url(),
  };
  return signUpInfos;
}
async function createUser(signUpCredentials: CreateUser) {
  const emailLowerCase = signUpCredentials.email.toLowerCase();
  const user = await prisma.user.create({
    data: {
      email: emailLowerCase,
      password: bcrypt.hashSync(signUpCredentials.password, 10),
      name: signUpCredentials.name,
      image: signUpCredentials.image,
    },
  });

  return user;
}

async function createSession(signInCredentials: CreateSessionWithPassword) {
  const response = await supertest(app).post("/signIn").send({
    password: signInCredentials.password,
    email: signInCredentials.email,
  });
  return response.body.token;
}

const authFactory = { createSignUpBody, createUser, createSession };
export default authFactory;
