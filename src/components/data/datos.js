import ajustes from "../assets/pngegg.png";
import alumnos from "../assets/estudiante.png";

import trimestrales from "../assets/puntuacion.png";
import xalumno from "../assets/xalumno.png";
import anuales from "../assets/anuales.png";

export const botones = [
  { title: "Ajustes", image: ajustes, toURL: "/configuration" },
  { title: "Estudiantes", image: alumnos, toURL: "/students" },
];
export const notasButtons = [
  { title: "Por materia", image: xalumno, toURL: "/notas/materia" },
  { title: "Trimestrales", image: trimestrales, toURL: "/notas/trimestrales" },
  { title: "Anual", image: anuales, toURL: "/anual" },
];
