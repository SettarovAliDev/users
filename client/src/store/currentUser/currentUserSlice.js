import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user, { dispatch }) => {
    const response = await axios({
      url: "users",
      method: "post",
      data: user,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.data.message) {
      console.log(response.data.message);
    } else {
      localStorage.setItem("token", JSON.stringify(response.data));
      dispatch(loginCurrentUser(response.data));
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, { dispatch }) => {
    const response = await axios({
      url: "login",
      method: "post",
      data: user,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.data.message) {
      console.log(response.data.message);
    } else {
      localStorage.setItem("token", JSON.stringify(response.data));
      dispatch(loginCurrentUser(response.data));
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { status: "idle", user: null },
  reducers: {
    loginCurrentUser(state, action) {
      console.log(action);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { loginCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
