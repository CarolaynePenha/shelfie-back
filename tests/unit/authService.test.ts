import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import authRepository from "../../src/repositories/authRepository";
import authService from "../../src/services/authService";

describe("auth service unit test suite", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("saveUser should call findMany function ", async () => {
    jest
      .spyOn(authRepository, "postUserInfos")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return null;
      });

    const signUpInfos = {
      name: faker.word.noun(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 13 }),
      image: faker.internet.url(),
    };
    await authService.saveUser(signUpInfos);
    expect(authRepository.findByEmail).toHaveBeenCalled();
    expect(authRepository.postUserInfos).toHaveBeenCalled();
  });
  it("saveUser should throw conflictError error", async () => {
    jest
      .spyOn(authRepository, "postUserInfos")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return { user: "user" };
      });

    const signUpInfos = {
      name: faker.word.noun(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 13 }),
      image: faker.internet.url(),
    };
    const promise = authService.saveUser(signUpInfos);
    expect(promise).rejects.toEqual({
      message: "E-mail already exists",
      type: "conflict",
    });
  });
  it("createSession should call createSession function ", async () => {
    jest
      .spyOn(authRepository, "createSession")
      .mockImplementationOnce((): any => {
        return null;
      });
    const SALT = 10;
    jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return { password: bcrypt.hashSync("password", SALT), id: 1 };
      });

    const signInInfos = {
      name: faker.word.noun(),
      email: faker.internet.email(),
      password: "password",
      image: faker.internet.url(),
    };
    await authService.createSession(signInInfos);
    expect(authRepository.createSession).toHaveBeenCalled();
  });
  it("createSession should throw unauthorizedError error, if user doesn't exist", async () => {
    jest
      .spyOn(authRepository, "createSession")
      .mockImplementationOnce((): any => {
        return null;
      });
    jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return null;
      });

    const signInInfos = {
      name: faker.word.noun(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      image: faker.internet.url(),
    };
    const promise = authService.createSession(signInInfos);
    expect(promise).rejects.toEqual({
      message: "Invalid email or password",
      type: "unauthorized",
    });
  });
  it("createSession should throw unauthorizedError error, if incorrect password ", async () => {
    jest
      .spyOn(authRepository, "createSession")
      .mockImplementationOnce((): any => {
        return null;
      });
    const SALT = 10;
    jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return { password: bcrypt.hashSync("password", SALT), id: 1 };
      });

    const signInInfos = {
      name: faker.word.noun(),
      email: faker.internet.email(),
      password: "otherPassword",
      image: faker.internet.url(),
    };
    const promise = authService.createSession(signInInfos);
    expect(promise).rejects.toEqual({
      message: "Invalid email or password",
      type: "unauthorized",
    });
  });
});
