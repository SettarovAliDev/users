import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user, { dispatch }) => {
    try {
      const response = await usersApi.post("api/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.data.message) {
        console.log(response.data.message);
      } else {
        localStorage.setItem("token", JSON.stringify(response.data.jwt));
        dispatch(loginCurrentUser(response.data.user));
      }
    } catch (error) {
      console.error(error.message);
      console.error(error.response.data.message);
      dispatch(setError(error.response.data.message));
    }
  }
);

export const loginUserByPassword = createAsyncThunk(
  "users/loginUserByPassword",
  async (user, { dispatch }) => {
    const response = await usersApi.post("api/auth/signin", user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response);
    if (response.data.message) {
      console.log(response.data.message);
    } else {
      localStorage.setItem("token", JSON.stringify(response.data.jwt));
      dispatch(loginCurrentUser(response.data.user));
    }
  }
);

export const loginUserByToken = createAsyncThunk(
  "users/loginUserByToken",
  async (user, { dispatch }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await usersApi.get("api/test/user", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token,
        },
      });
      console.log(response);
      console.log(token);
      if (response.data.message) {
        console.log(response.data.message);
        localStorage.removeItem("token");
      } else {
        // localStorage.setItem("token", JSON.stringify(response.data.jwt));
        dispatch(loginCurrentUser(response.data));
      }
    } catch (error) {
      console.error(error.message);
      console.error(error.response.data.message);
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    loginCurrentUser(state, action) {
      console.log(action);
      state.user = action.payload;
    },
    logoutCurrentUser(state, action) {
      state.user = null;
    },
    setError(state, action) {
      state.error = action.payload;
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
      .addCase(loginUserByPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserByPassword.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUserByPassword.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUserByToken.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserByToken.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUserByToken.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { loginCurrentUser, logoutCurrentUser, setError } =
  currentUserSlice.actions;
export default currentUserSlice.reducer;
