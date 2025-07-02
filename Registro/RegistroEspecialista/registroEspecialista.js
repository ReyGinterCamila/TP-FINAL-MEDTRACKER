document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroEspecialistaForm");
  const mensajeError = document.getElementById("mensajeEspecialista");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
    const tipoDocumento = document.getElementById("tipoDocumento").value.trim();
    const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    const domicilio = document.getElementById("domicilio").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();
    const contraseñaRepetida = document.getElementById("contraseñaRepetida").value.trim();

    // Validaciones
    if (!nombre || !apellido || !fechaNacimiento || !tipoDocumento || !numeroDocumento || !domicilio || !email || !telefono || !matricula || !especialidad || !contraseña || !contraseñaRepetida) {
      mostrarError("Asegúrese de completar todos los campos correctamente.");
      return;
    }

    if (contraseña !== contraseñaRepetida) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }

    if (!validarContraseña(contraseña)) {
      mostrarError("La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.");
      return;
    }

    // Obtener usuarios guardados
    const usuariosRaw = localStorage.getItem("usuariosMT");
    const usuarios = usuariosRaw ? JSON.parse(usuariosRaw) : [];

    // Evitar email duplicado
    if (usuarios.some(u => u.email === email)) {
      mostrarError("Ese correo ya está registrado.");
      return;
    }

    // Agregar el especialista
    usuarios.push({ email, password: contraseña, rol: "medico" });
    localStorage.setItem("usuariosMT", JSON.stringify(usuarios));

    // Guardar datos clínicos en otra lista
    const medicosRaw = localStorage.getItem("medicosDePrueba");
    const medicos = medicosRaw ? JSON.parse(medicosRaw) : [];
    medicos.push({ nombre, apellido, matricula, especialidad, email, telefono, domicilio });
    localStorage.setItem("medicosDePrueba", JSON.stringify(medicos));

    // Login automático
    sessionStorage.setItem("userRole", "medico");

    alert("Registro exitoso! Redirigiendo al panel...");
    form.reset();
    window.location.href = "../../homeEspecialista.html";
  });

  function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("mensajeError");
    mensajeError.classList.add("mostrarMensajeError");
  }

  function validarContraseña(contraseña) {
    if (contraseña.length < 7) return false;
    let tieneMayuscula = false;
    let tieneNumero = false;
    for (let i = 0; i < contraseña.length; i++) {
      const char = contraseña[i];
      if (!isNaN(char)) {
        tieneNumero = true;
      } else if (char === char.toUpperCase() && char.match(/[A-Z]/)) {
        tieneMayuscula = true;
      }
    }
    return tieneMayuscula && tieneNumero;
  }
});
