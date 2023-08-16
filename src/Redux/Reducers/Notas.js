import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotas = createAsyncThunk("notas/getNotas", async (payload) => {
  const response = await axios
    .get(`http://localhost:3001/api/notas?id=${payload}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return response;
});

export const postNotas = createAsyncThunk("notas/getNotas", async (payload) => {
  const response = await axios
    .post("http://localhost:3001/api/notas?id=", payload)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return response.data;
});

const initialState = { notasList: [] };

const notasSlice = createSlice({
  name: "notas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotas.pending, () => {
        console.log("Trayendo Notas");
      })
      .addCase(postNotas.fulfilled, (state, action) => {
        state.notasList = action.payload;
      });
  },
});
export default notasSlice.reducer;

export const listNotas = (state) => state.notas.notasList;
