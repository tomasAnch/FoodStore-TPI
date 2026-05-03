import { checkAuthUser, logout } from "../../../utils/auth";
import { navigate } from "../../../utils/navigate";

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const initPage = () => {
  checkAuthUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );
  navigate("../../store/home/home.html"); // ← redirección al store
};

initPage();
