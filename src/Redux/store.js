import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/Usuario";
import alumnoSlice from "./Reducers/Alumnos";
import materiaSlice from "./Reducers/Materia";

export const store = configureStore({
  reducer: { user: userSlice, alumnos: alumnoSlice, materias: materiaSlice },
});
