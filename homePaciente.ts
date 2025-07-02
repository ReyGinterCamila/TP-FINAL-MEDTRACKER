window.addEventListener("DOMContentLoaded", () => {
  const configBtn = document.getElementById("btn-config")!;
  const configMenu = document.getElementById("config-menu")!;
  const infoUsuario = document.getElementById("infoUsuario")!;

  const inputNombre = document.getElementById("inputNombre") as HTMLInputElement;
  const inputApellido = document.getElementById("inputApellido") as HTMLInputElement;
  const inputTelefono = document.getElementById("inputTelefono") as HTMLInputElement;
  const inputEmail = document.getElementById("inputEmail") as HTMLInputElement;

  const btnGuardar = document.getElementById("btnGuardar")!;
  const btnEliminar = document.getElementById("btnEliminar")!;

  // MOSTRAR/OCULTAR MENÚ
  configBtn.addEventListener("click", () => {
    const mostrar = configMenu.style.display === "flex" ? "none" : "flex";
    configMenu.style.display = mostrar;
    infoUsuario.style.display = mostrar;
  });

  // BUSCAR DATOS DEL USUARIO ACTIVO
  const emailActivo = localStorage.getItem("usuarioActivo") || sessionStorage.getItem("userEmail");


  if (!emailActivo) {
    alert("No hay usuario activo.");
    window.location.href = "home.html";
    return;
  }

  

  const pacientesRaw = localStorage.getItem("pacientesDePrueba");
  const pacientes = pacientesRaw ? JSON.parse(pacientesRaw) : [];
  const paciente = pacientes.find((p: any) => p.email === emailActivo);

  if (!paciente) {
    alert("No se encontraron los datos del usuario.");
    return;
  }

  // MOSTRAR DATOS EN INPUTS
  inputNombre.value = paciente.nombre;
  inputApellido.value = paciente.apellido;
  inputTelefono.value = paciente.telefono;
  inputEmail.value = paciente.email;

  // GUARDAR CAMBIOS
  btnGuardar.addEventListener("click", () => {
    paciente.nombre = inputNombre.value.trim();
    paciente.apellido = inputApellido.value.trim();
    paciente.telefono = inputTelefono.value.trim();

    const index = pacientes.findIndex((p: any) => p.email === emailActivo);
    if (index !== -1) {
      pacientes[index] = paciente;
      localStorage.setItem("pacientesDePrueba", JSON.stringify(pacientes));
      alert("Cambios guardados correctamente.");
    }
  });

  // ELIMINAR USUARIO
  btnEliminar.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que querés eliminar tu cuenta?");
    if (!confirmar) return;

    const nuevosPacientes = pacientes.filter((p: any) => p.email !== emailActivo);
    localStorage.setItem("pacientesDePrueba", JSON.stringify(nuevosPacientes));
    localStorage.removeItem("usuarioActivo");
    sessionStorage.clear();

    alert("Cuenta eliminada. Redirigiéndote al inicio.");
    window.location.href = "home.html";
  });

  // CERRAR CONFIG AL HACER CLIC FUERA
  window.addEventListener("click", (e) => {
    if (!configBtn.contains(e.target as Node) && !configMenu.contains(e.target as Node)) {
      configMenu.style.display = "none";
      infoUsuario.style.display = "none";
    }
  });
});
