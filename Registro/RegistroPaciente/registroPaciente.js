document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroPacienteForm");
  const mensajeError = document.getElementById("mensajeError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    /* --- TOMAR VALORES --- */    
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
    const tipoDocumento = document.getElementById("tipoDocumento").value.trim();
    const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    const domicilio = document.getElementById("domicilio").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();
    const contraseñaRepetida = document.getElementById("contraseñaRepetida").value.trim();

    /* --- VALIDACIONES DE DATOS --- */
    if (!nombre || !apellido || !fechaNacimiento || !tipoDocumento || !numeroDocumento || !domicilio || !email || !telefono || !contraseña || !contraseñaRepetida) {
      mostrarError("Asegúrese de completar todos los campos correctamente.");
      return;
    }

    //verificamos que las contraseñas coincidan
    if (contraseña !== contraseñaRepetida) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }

    //verificamos que la contraseña cumpla con los requisitos
    if (!validarContraseña(contraseña)) {
      mostrarError("La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.");
      return;
    }
    
   /* --- REGISTRO EN localStorage.usuariosMT --- */
    const usuariosRaw = localStorage.getItem("usuariosMT");
    const usuarios    = usuariosRaw ? JSON.parse(usuariosRaw) : [];

    // Evitar email duplicado
    if (usuarios.some(u => u.email === email)) {
      mostrarError("Ese correo ya está registrado.");
      return;
    }

    // Guardar nuevo usuario con su rol
    usuarios.push({ email, password: contraseña, rol: "paciente" });
    localStorage.setItem("usuariosMT", JSON.stringify(usuarios));

    /* --- EXTRA opcional: guardar datos clínicos en otra lista --- */
    const pacientesRaw = localStorage.getItem("pacientesDePrueba");
    const pacientes    = pacientesRaw ? JSON.parse(pacientesRaw) : [];
    pacientes.push({ nombre, apellido, numeroDocumento, fechaNacimiento, email, telefono, domicilio });
    localStorage.setItem("pacientesDePrueba", JSON.stringify(pacientes));

    /* --- LOGIN AUTOMÁTICO --- */
sessionStorage.setItem("userRole", "paciente");
sessionStorage.setItem("userEmail", email);
localStorage.setItem("usuarioActivo", email);


    alert("¡Registro exitoso! Redirigiéndote a tu panel…");
    window.location.href = "../../homePaciente.html";
  });

  function mostrarError(mensaje){
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("mensajeError");
    mensajeError.classList.add("mostrarMensajeError");
  }

  function validarContraseña(pass){
    if (pass.length < 7) return false;
    let mayusc = false, num = false;
    for (const c of pass){
      if (!isNaN(c)) num = true;
      else if (/[A-Z]/.test(c) && c === c.toUpperCase()) mayusc = true;
    }
    return mayusc && num;
  }
});

