import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAlumnos = createAsyncThunk(
  "alumnos/getAlumnos",
  async (payload) => {
    const response = await axios
      .get(`http://localhost:3001/api/alumnos?id=${payload}`)
      .then((response) => response.data)
      .catch((err) => console.log(err));
    return response;
  }
);

export const postAlumnos = createAsyncThunk(
  "alumnos/postAlumnos",
  async (payload) => {
    const response = await axios
      .post("http://localhost:3001/api/alumnos", payload)
      .then((response) => response.data)
      .catch((err) => console.log(err));
    return response.data;
  }
);

const initialState = { alumnosList: [] };

const alumnoSlice = createSlice({
  name: "alumnos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlumnos.pending, () => {
        console.log("Trayendo Alumnos");
      })
      .addCase(getAlumnos.fulfilled, (state, action) => {
        state.alumnosList = action.payload;
      });
  },
});
export default alumnoSlice.reducer;

export const listAlumno = (state) => state.alumnos.alumnosList;
