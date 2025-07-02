// Definimos un molde de objeto que representa un turno médico
type Turno = {
  nombre: string;
  motivo: string;
  horaIndex: number;
  diaIndex: number;
};

const horarios = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

let turnos: Turno[] = [
  { nombre: "Camila", motivo: "Control", horaIndex: 1, diaIndex: 2 },
  { nombre: "Anita", motivo: "Dolor Estomacal", horaIndex: 2, diaIndex: 2 },
  { nombre: "Marcos", motivo: "Chequeo Anual", horaIndex: 3, diaIndex: 2 },
  { nombre: "Daniela", motivo: "Consulta general", horaIndex: 4, diaIndex: 2 },
  { nombre: "Margarita", motivo: "Vacunación", horaIndex: 4, diaIndex: 3 },
  { nombre: "Santiago", motivo: "Control", horaIndex: 6, diaIndex: 4 },
];

function crearTabla(): void {
  const tbody = document.getElementById("tablaTurnos");
  if (!tbody) return;
  tbody.innerHTML = "";

  horarios.forEach((hora, i) => {
    const fila = document.createElement("tr");
    const thHora = document.createElement("th");
    thHora.textContent = hora;
    fila.appendChild(thHora);

    dias.forEach((dia, j) => {
      const celda = document.createElement("td");

      let turno: Turno | null = null;
      for (const t of turnos) {
        if (t.horaIndex === i && t.diaIndex === j) {
          turno = t;
          break;
        }
      }

      if (turno) {
        celda.className = "reservado";
        celda.innerHTML = `
    <strong>Paciente:</strong> ${turno.nombre}<br>
    <strong>Motivo:</strong> ${turno.motivo}<br>
    <button class="btn-cancelar">Cancelar Turno</button>
  `;

        const cancelarBtn = celda.querySelector(
          ".btn-cancelar"
        ) as HTMLButtonElement | null;
        if (cancelarBtn) {
          cancelarBtn.addEventListener("click", () => cancelarTurno(i, j));
        }
      } else {
        celda.className = "disponible";
        celda.textContent = "Disponible";
      }

      fila.appendChild(celda);
    });

    tbody.appendChild(fila);
  });
}

function cancelarTurno(horaIndex: number, diaIndex: number): void {
  if (confirm("¿Querés cancelar este turno?")) {
    turnos = turnos.filter(
      (t) => !(t.horaIndex === horaIndex && t.diaIndex === diaIndex)
    );
    crearTabla();
  }
}

window.addEventListener("DOMContentLoaded", crearTabla);

document.addEventListener("DOMContentLoaded", () => {
  const volverBtn = document.getElementById("btnVolver");
  if (volverBtn) {
    volverBtn.addEventListener("click", () => {
      window.location.href = "../homeEspecialista.html";
    });
  }
});
