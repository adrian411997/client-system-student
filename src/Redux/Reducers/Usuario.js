import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("usuario/login", async (payload) => {
  const response = await axios
    .post("http://localhost:3001/api/user/login", payload)
    .then((response) => response.data)
    .catch((err) => {
      return err.response.data;
    });

  return response;
});

const initialState = {
  userCredentials: JSON.parse(localStorage.getItem("userCredentials")) || {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("userCredentials");
      state.userCredentials = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("Logueando");
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userCredentials = action.payload;
        if ("token" in action.payload) {
          localStorage.setItem(
            "userCredentials",
            JSON.stringify(action.payload)
          );
          state.userCredentials = action.payload;
        }
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
export const credentials = (state) => state.user.userCredentials;
