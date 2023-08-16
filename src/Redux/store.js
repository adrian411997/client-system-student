import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/Usuario";
import alumnoSlice from "./Reducers/Alumnos";
import materiaSlice from "./Reducers/Materia";
import notasSlice from "./Reducers/Notas";

export const store = configureStore({
  reducer: {
    user: userSlice,
    alumnos: alumnoSlice,
    materias: materiaSlice,
    notas: notasSlice,
  },
});
