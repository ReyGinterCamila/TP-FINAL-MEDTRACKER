window.addEventListener("DOMContentLoaded", function () {
    var configBtn = document.getElementById("btn-config");
    var configMenu = document.getElementById("config-menu");
    var infoUsuario = document.getElementById("infoUsuario");
    var inputNombre = document.getElementById("inputNombre");
    var inputApellido = document.getElementById("inputApellido");
    var inputTelefono = document.getElementById("inputTelefono");
    var inputEmail = document.getElementById("inputEmail");
    var btnGuardar = document.getElementById("btnGuardar");
    var btnEliminar = document.getElementById("btnEliminar");
    // MOSTRAR/OCULTAR MENÚ
    configBtn.addEventListener("click", function () {
        var mostrar = configMenu.style.display === "flex" ? "none" : "flex";
        configMenu.style.display = mostrar;
        infoUsuario.style.display = mostrar;
    });
    // BUSCAR DATOS DEL USUARIO ACTIVO
    var emailActivo = localStorage.getItem("usuarioActivo");
    if (!emailActivo) {
        alert("No hay usuario activo.");
        window.location.href = "home.html";
        return;
    }
    var pacientesRaw = localStorage.getItem("pacientesDePrueba");
    var pacientes = pacientesRaw ? JSON.parse(pacientesRaw) : [];
    var paciente = pacientes.find(function (p) { return p.email === emailActivo; });
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
    btnGuardar.addEventListener("click", function () {
        paciente.nombre = inputNombre.value.trim();
        paciente.apellido = inputApellido.value.trim();
        paciente.telefono = inputTelefono.value.trim();
        var index = pacientes.findIndex(function (p) { return p.email === emailActivo; });
        if (index !== -1) {
            pacientes[index] = paciente;
            localStorage.setItem("pacientesDePrueba", JSON.stringify(pacientes));
            alert("Cambios guardados correctamente.");
        }
    });
    // ELIMINAR USUARIO
    btnEliminar.addEventListener("click", function () {
        var confirmar = confirm("¿Seguro que querés eliminar tu cuenta?");
        if (!confirmar)
            return;
        var nuevosPacientes = pacientes.filter(function (p) { return p.email !== emailActivo; });
        localStorage.setItem("pacientesDePrueba", JSON.stringify(nuevosPacientes));
        localStorage.removeItem("usuarioActivo");
        sessionStorage.clear();
        alert("Cuenta eliminada. Redirigiéndote al inicio.");
        window.location.href = "home.html";
    });
    // CERRAR CONFIG AL HACER CLIC FUERA
    window.addEventListener("click", function (e) {
        if (!configBtn.contains(e.target) && !configMenu.contains(e.target)) {
            configMenu.style.display = "none";
            infoUsuario.style.display = "none";
        }
    });
});
