import { getUsers, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const usuarioEncontrado = getUsers().find(
    (u) => u.email === valueEmail && u.password === valuePassword
  );

  if (usuarioEncontrado) {
    const usuarioLogueado = { ...usuarioEncontrado, loggedIn: true };
    saveUser(usuarioLogueado);
    if (usuarioEncontrado.role === "client") {
      navigate("/src/pages/client/home/home.html");
    } else if (usuarioEncontrado.role === "admin") {
      navigate("/src/pages/admin/home/home.html");
    }
  } else {
    alert('Usuario o contraseña incorrectos');
  }

});
