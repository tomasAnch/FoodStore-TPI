import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuthUser = ( redireccion1: string, redireccion2: string, rol: Rol): void => {
  console.log("comienzo de checkeo");

  const user = getUSer();

  if (!user) {
    console.log("no existe en local");
    navigate(redireccion1);
    return;
  } else {
    const parseUser: IUser = JSON.parse(user);
    if (parseUser.role !== rol) {
      console.log("existe pero no tiene el rol necesario"); // <- cuando el rol no coincide
      navigate(redireccion2);
      return;
    }
  }
};

export const logout = (): void => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};
