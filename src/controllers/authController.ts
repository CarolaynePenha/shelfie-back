import { User } from "@prisma/client";
import { Request, Response } from "express";
import authService from "../services/authService.js";

export type CreateUser = Omit<User, "id" | "createdAt">;

export async function signUp(req: Request, res: Response) {
  const signUpInfos: CreateUser = req.body;
  await authService.saveUser(signUpInfos);
  res.sendStatus(201);
}
export async function signIn(req: Request, res: Response) {
  const signInInfos: CreateUser = req.body;
  const sessionInfos = await authService.createSession(signInInfos);
  res.status(201).send(sessionInfos);
}
