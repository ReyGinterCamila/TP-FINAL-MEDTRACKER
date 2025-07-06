/* =================================================================
   LOGIN 
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensajeError = document.getElementById("mensajeError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    /* ----- 1. Cargar listas desde localStorage ----- */
    const pacientes = JSON.parse(localStorage.getItem("pacientesDePrueba")) || [];
    const especialistas = JSON.parse(localStorage.getItem("especialistasDePrueba")) || [];

    /* ----- 2. Buscar coincidencia ----- */
    const pacienteEncontrado = pacientes.find(p => p.email === email && p.contraseña === password);
    const especialistaEncontrado = especialistas.find(e => e.email === email && e.contraseña === password);

    /* ----- 3. Validar login ----- */
    if (pacienteEncontrado) {
      localStorage.setItem("pacienteActivo", JSON.stringify({ tipo: "paciente", email }));
      alert("✅ Inicio de sesión exitoso como paciente");
      window.location.href = "../menuPaciente/menuPaciente.html";
    } else if (especialistaEncontrado) {
      localStorage.setItem("especialistasActivo", JSON.stringify({ tipo: "especialista", email }));
      alert("✅ Inicio de sesión exitoso como especialista");
      window.location.href = "../menuEspecialista/menuEspecialista.html";
    } else {
      mensajeError.textContent = "Credenciales incorrectas.";
      mensajeError.classList.remove("mensajeError");
      mensajeError.classList.add("mostrarMensajeError");
    }
  });
});
