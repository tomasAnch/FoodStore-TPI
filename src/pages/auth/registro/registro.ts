import type { IUser } from "../../../types/IUser";
import { getUsers, saveUsers } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const formularioRegistro = document.getElementById('formRegistro') as HTMLFormElement;

formularioRegistro.addEventListener('submit', (event: SubmitEvent): void => {

    event?.preventDefault();

    const emailInput = document.getElementById('emailRegistro') as HTMLInputElement;
    const passwordInput = document.getElementById('passwordRegistro') as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    const usuariosActuales = getUsers();

    const yaExiste = usuariosActuales.some((u) => u.email === email);
    if (yaExiste) {
        alert("Ya existe un usuario con ese email");
        return;
    }

    const usuario: IUser = {
        email: email,
        password: password,
        loggedIn: false,
        role: 'client'
    }

    usuariosActuales.push(usuario);
    saveUsers(usuariosActuales);

    alert("¡Registro exitoso! Ahora podés iniciar sesión.");
    navigate("/src/pages/auth/login/login.html");
})