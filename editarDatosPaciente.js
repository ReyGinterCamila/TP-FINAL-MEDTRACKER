/* =========================================================
   EDITAR PERFIL PACIENTE – MedTracker
   (compila a editarDatosPaciente.js)
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    /* 1. ¿Quién está logueado? --------------------------------- */
    var emailActivo = sessionStorage.getItem("userEmail");
    if (!emailActivo) {
        alert("No hay sesión activa."); // <- no debería ocurrir
        return (window.location.href = "../Login/login.html");
    }
    /* 2. Traer la lista de pacientes --------------------------- */
    var pacientes = JSON.parse(localStorage.getItem("pacientesDePrueba") || "[]");
    /* --- reemplazamos findIndex por un for clásico --- */
    var idx = -1;
    for (var i = 0; i < pacientes.length; i++) {
        if (pacientes[i].email === emailActivo) {
            idx = i;
            break;
        }
    }
    if (idx === -1) {
        alert("No se encontraron tus datos en el sistema.");
        return;
    }
    var paciente = pacientes[idx];
    /* 3. Precargar el formulario ------------------------------- */
    document.getElementById("nombre").value = paciente.nombre;
    document.getElementById("apellido").value = paciente.apellido;
    document.getElementById("fechaNacimiento").value = paciente.fechaNacimiento;
    document.getElementById("tipoDocumento").value = paciente.tipoDocumento;
    document.getElementById("numeroDocumento").value = paciente.numeroDocumento;
    document.getElementById("domicilio").value = paciente.domicilio;
    document.getElementById("telefono").value = paciente.telefono;
    document.getElementById("email").value = paciente.email;
    /* 4. Guardar cambios --------------------------------------- */
    var form = document.getElementById("editarPerfilForm");
    var aviso = document.getElementById("mensajeConfirmacion");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // Tomar nuevos valores
        paciente.nombre = document.getElementById("nombre").value.trim();
        paciente.apellido = document.getElementById("apellido").value.trim();
        paciente.fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
        paciente.tipoDocumento = document.getElementById("tipoDocumento").value;
        paciente.numeroDocumento = document.getElementById("numeroDocumento").value.trim();
        paciente.domicilio = document.getElementById("domicilio").value.trim();
        paciente.telefono = document.getElementById("telefono").value.trim();
        paciente.email = document.getElementById("email").value.trim();
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
