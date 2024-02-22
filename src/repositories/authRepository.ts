import { Session } from "@prisma/client";
import { prisma } from "../config/database.js";
import { CreateUser } from "../controllers/authController.js";

export type CreateSession = Omit<Session, "id" | "createdAt">;

async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}
async function postUserInfos(signUpInfos: CreateUser) {
  await prisma.user.create({ data: signUpInfos });
}
async function createSession(signInInfos: CreateSession) {
  await prisma.session.create({ data: signInInfos });
}

const authRepository = {
  findByEmail,
  postUserInfos,
  createSession,
};

export default authRepository;
