const btnBuscar = document.getElementById("btnBuscar") as HTMLButtonElement;

btnBuscar.addEventListener("click", () => {
  window.location.href = "../homePaciente.html";
});

interface TurnoDisponible {
  especialidad: string;
  horarios: string[];
}

const especialidades: TurnoDisponible[] = [
  { especialidad: "Clínica Médica", horarios: ["09:00", "10:00", "11:00"] },
  { especialidad: "Pediatría", horarios: ["10:00", "12:00", "14:00"] },
  { especialidad: "Cardiología", horarios: ["08:00", "09:30", "11:30"] },
  { especialidad: "Dermatología", horarios: ["08:00", "08:30", "09:00"] }
];

const especialidadSelect = document.getElementById("especialidad") as HTMLSelectElement;
const horaSelect = document.getElementById("hora") as HTMLSelectElement;
const fechaInput = document.getElementById("fecha") as HTMLInputElement;
const agendarBtn = document.getElementById("agendarBtn") as HTMLButtonElement;

function cargarEspecialidades() {
  for (let i = 0; i < especialidades.length; i++) {
    const option = document.createElement("option");
    option.value = especialidades[i].especialidad;
    option.textContent = especialidades[i].especialidad;
    especialidadSelect.appendChild(option);
  }
}

function cargarHorarios(especialidad: string) {
  horaSelect.innerHTML = "";
  let horarios: string[] = [];

  for (let i = 0; i < especialidades.length; i++) {
    if (especialidades[i].especialidad === especialidad) {
      horarios = especialidades[i].horarios;
      break;
    }
  }

  for (let j = 0; j < horarios.length; j++) {
    const option = document.createElement("option");
    option.value = horarios[j];
    option.textContent = horarios[j];
    horaSelect.appendChild(option);
  }
}

especialidadSelect.addEventListener("change", function () {
  const seleccionada = especialidadSelect.value;
  cargarHorarios(seleccionada);
});

agendarBtn.addEventListener("click", function () {
  const especialidad = especialidadSelect.value;
  const fecha = fechaInput.value;
  const hora = horaSelect.value;

  if (!especialidad || !fecha || !hora) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  alert("Turno agendado:\n" +
    "Especialidad: " + especialidad + "\n" +
    "Fecha: " + fecha + "\n" +
    "Hora: " + hora);
});

document.addEventListener("DOMContentLoaded", function () {
  cargarEspecialidades();
  cargarHorarios(especialidades[0].especialidad);
});
