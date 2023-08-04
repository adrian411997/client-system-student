import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMaterias = createAsyncThunk(
  "materias/getMaterias",
  async () => {
    const response = await axios
      .get(`http://localhost:3001/api/materia`)
      .then((response) => response.data)
      .catch((err) => console.log(err));
    return response;
  }
);
export const postMateria = createAsyncThunk(
  "materias/postMateria",
  async (payload) => {
    const response = await axios
      .post("http://localhost:3001/api/materia", payload)
      .then((response) => response.data)
      .catch((err) => console.log(err));
    return response.data;
  }
);

const initialState = { materiaList: [] };

const materiaSlice = createSlice({
  name: "materias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMaterias.pending, () => {
        console.log("Trayendo Materias");
      })
      .addCase(getMaterias.fulfilled, (state, action) => {
        state.materiaList = action.payload;
      });
  },
});

export default materiaSlice.reducer;

export const listMateria = (state) => state.materias.materiaList;
