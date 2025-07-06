/* =================================================================
   LOGIN – MedTracker
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg  = document.getElementById("mensajeError");   // usa el mismo <p> para errores

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass  = document.getElementById("password").value.trim();

    /* ----- 1. Traer lista de usuarios guardados ----- */
    const usuariosRaw = localStorage.getItem("usuariosMT");
    const usuarios    = usuariosRaw ? JSON.parse(usuariosRaw) : [];

    /* ----- 2. Buscar coincidencia ----- */
    let user = usuarios.find(u => u.email === email && u.password === pass);

    /* ----- 3. Fallback “admin” hard‑codeado (opcional) ----- */
    if (!user && email === "admin@gmail.com" && pass === "Admin123") {
      user = { rol: "medico" };  // o “admin” si tienes dashboard aparte
    }

    /* ----- 4. Validar ----- */
    if (!user) {
      msg.textContent = "Credenciales incorrectas.";
      msg.classList.remove("mensajeError");
      msg.classList.add("mostrarMensajeError");
      return;
    }

    /* ----- 5. Login exitoso: guardar rol, email y redirigir ----- */
sessionStorage.setItem("userRole", user.rol);
sessionStorage.setItem("userEmail", email);

if (user.rol === "medico") {
  window.location.href = "../homeEspecialista.html";
} else {
  window.location.href = "../homePaciente.html";
}

  });
});
