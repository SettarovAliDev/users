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
      console.error(error?.response?.data?.message);
      dispatch(setSignUpError(error.response.data.message));
    }
  }
);

export const loginUserByPassword = createAsyncThunk(
  "users/loginUserByPassword",
  async (user, { dispatch }) => {
    try {
      const response = await usersApi.post("api/auth/signin", user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      localStorage.setItem("token", JSON.stringify(response.data.jwt));
      dispatch(loginCurrentUser(response.data.user));
    } catch (error) {
      console.error(error.message);
      console.error(error?.response?.data?.message);
      dispatch(setSignInError(error.response.data.message));
    }
  }
);

export const loginUserByToken = createAsyncThunk(
  "users/loginUserByToken",
  async (user, { dispatch }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await usersApi.get("api/auth/login", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token,
        },
      });

      localStorage.setItem("token", JSON.stringify(response.data.jwt));
      dispatch(loginCurrentUser(response.data.user));
    } catch (error) {
      console.error(error.message);
      console.error(error.response.data.message);
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: null,
    status: "idle",
    signUpError: null,
    signInError: null,
  },
  reducers: {
    loginCurrentUser(state, action) {
      state.user = action.payload;
    },
    logoutCurrentUser(state, action) {
      state.user = null;
      state.signInError = null;
      state.signUpError = null;
    },
    setSignUpError(state, action) {
      state.signUpError = action.payload;
    },
    setSignInError(state, action) {
      state.signInError = action.payload;
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

export const {
  loginCurrentUser,
  logoutCurrentUser,
  setSignUpError,
  setSignInError,
} = currentUserSlice.actions;
export default currentUserSlice.reducer;
