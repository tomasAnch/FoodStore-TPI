import type { IUser } from "../types/IUser";

export const saveUser = (user: IUser): void => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};

export const getUser = (): string | null => {
  return localStorage.getItem("userData");
};

export const removeUser = (): void => {
  localStorage.removeItem("userData");
};

export const getUsers = (): IUser[] => {
  const users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users);
  }
  return [];
};

export const saveUsers = (users: IUser[]): void => {
  const usersJSON = JSON.stringify(users);
  localStorage.setItem("users", usersJSON);
};