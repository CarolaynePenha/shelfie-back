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

async function findUserById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  delete user.password;
  return user;
}
async function deleteAllSession() {
  return await prisma.session.deleteMany();
}

async function deleteAllUsers() {
  return await prisma.user.deleteMany();
}

const authRepository = {
  findByEmail,
  postUserInfos,
  createSession,
  findUserById,
  deleteAllSession,
  deleteAllUsers,
};

export default authRepository;
