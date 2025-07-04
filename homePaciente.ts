window.addEventListener("DOMContentLoaded", () => {
  const configBtn   = document.getElementById("btn-config") as HTMLElement;
  const configMenu  = document.getElementById("config-menu")  as HTMLElement;
  const btnEliminar = document.getElementById("btnEliminar")  as HTMLButtonElement;

  /* Mostrar / ocultar menú */
  configBtn.addEventListener("click", () => {
    configMenu.style.display = configMenu.style.display === "flex" ? "none" : "flex";
  });

  /* Ocultar si clickeás afuera */
  document.addEventListener("click", e => {
    const target = e.target as HTMLElement;
    if (!configMenu.contains(target) && !configBtn.contains(target)) {
      configMenu.style.display = "none";
    }
  });

  /* Eliminar usuario */
  btnEliminar.addEventListener("click", () => {
    if (!confirm("¿Realmente querés eliminar tu usuario? Esta acción es irreversible.")) return;

    /* Busco al paciente activo */
    const activo   = localStorage.getItem("pacienteActivo");
    const pacientesJSON = localStorage.getItem("pacientesDePrueba");
    if (!activo || !pacientesJSON) { volverAlLogin(); return; }

    const { email } = JSON.parse(activo);
    const pacientes = JSON.parse(pacientesJSON) as any[];

    /* Borro del array y actualizo storage */
    const restantes = pacientes.filter(p => p.email !== email);
    localStorage.setItem("pacientesDePrueba", JSON.stringify(restantes));

    /* Borro la sesión */
    localStorage.removeItem("pacienteActivo");

    alert("Tu usuario fue eliminado correctamente.");
    volverAlLogin();
  });

  function volverAlLogin() {
    window.location.href = "../Login/login.html";
  }
});
const btnBuscar = document.getElementById("btnBuscar") as HTMLButtonElement;

btnBuscar.addEventListener("click", () => {
window.location.href = "simulacion/solicitarTurno.html";
 
});