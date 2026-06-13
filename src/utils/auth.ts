import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUser, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuthUser = ( redireccion1: string, redireccion2: string, rol: Rol): void => {
  const user = getUser();

  if (!user) {
    navigate(redireccion1);
    return;
  } else {
    const parseUser: IUser = JSON.parse(user);
    if (parseUser.role !== rol) {
      navigate(redireccion2);
      return;
    }
  }
};

export const logout = (): void => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};
