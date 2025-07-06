/* =========================================================
   EDITAR PERFIL PACIENTE – MedTracker
   (compila a editarDatosPaciente.js)
   ========================================================= */

interface Paciente {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  tipoDocumento: string;
  numeroDocumento: string;
  domicilio: string;
  telefono: string;
  email: string;
}

document.addEventListener("DOMContentLoaded", () => {

  /* 1. ¿Quién está logueado? --------------------------------- */
  const emailActivo = sessionStorage.getItem("userEmail");
  if (!emailActivo) {
    alert("No hay sesión activa.");                 // <- no debería ocurrir
    return (window.location.href = "../Login/login.html");
  }

  /* 2. Traer la lista de pacientes --------------------------- */
  const pacientes: Paciente[] =
    JSON.parse(localStorage.getItem("pacientesDePrueba") || "[]");

  /* --- reemplazamos findIndex por un for clásico --- */
  let idx = -1;
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].email === emailActivo) {
      idx = i;
      break;
    }
  }

  if (idx === -1) {
    alert("No se encontraron tus datos en el sistema.");
    return;
  }

  const paciente = pacientes[idx];

  /* 3. Precargar el formulario ------------------------------- */
  (document.getElementById("nombre")           as HTMLInputElement).value = paciente.nombre;
  (document.getElementById("apellido")         as HTMLInputElement).value = paciente.apellido;
  (document.getElementById("fechaNacimiento")  as HTMLInputElement).value = paciente.fechaNacimiento;
  (document.getElementById("tipoDocumento")    as HTMLSelectElement).value = paciente.tipoDocumento;
  (document.getElementById("numeroDocumento")  as HTMLInputElement).value = paciente.numeroDocumento;
  (document.getElementById("domicilio")        as HTMLInputElement).value = paciente.domicilio;
  (document.getElementById("telefono")         as HTMLInputElement).value = paciente.telefono;
  (document.getElementById("email")            as HTMLInputElement).value = paciente.email;

  /* 4. Guardar cambios --------------------------------------- */
  const form   = document.getElementById("editarPerfilForm") as HTMLFormElement;
  const aviso  = document.getElementById("mensajeConfirmacion") as HTMLElement;

  form.addEventListener("submit", e => {
    e.preventDefault();

    // Tomar nuevos valores
    paciente.nombre          = (document.getElementById("nombre")          as HTMLInputElement).value.trim();
    paciente.apellido        = (document.getElementById("apellido")        as HTMLInputElement).value.trim();
    paciente.fechaNacimiento = (document.getElementById("fechaNacimiento") as HTMLInputElement).value.trim();
    paciente.tipoDocumento   = (document.getElementById("tipoDocumento")   as HTMLSelectElement).value;
    paciente.numeroDocumento = (document.getElementById("numeroDocumento") as HTMLInputElement).value.trim();
    paciente.domicilio       = (document.getElementById("domicilio")       as HTMLInputElement).value.trim();
    paciente.telefono        = (document.getElementById("telefono")        as HTMLInputElement).value.trim();
    paciente.email           = (document.getElementById("email")           as HTMLInputElement).value.trim();

    /* 4a. Actualizar array y storage */
    pacientes[idx] = paciente;
    localStorage.setItem("pacientesDePrueba", JSON.stringify(pacientes));

    /* 4b. Mantener la sesión coherente si cambió el correo */
    sessionStorage.setItem("userEmail", paciente.email);

    /* 4c. Feedback al usuario */
    aviso.textContent = "✔ Perfil actualizado correctamente.";
    aviso.style.color = "green";
  });
});
