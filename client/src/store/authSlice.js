import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import usersApi from "../api/usersApi";

import { fetchUsers, fetchUser } from "./usersSlice";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { dispatch }) => {
    try {
      const response = await usersApi.post("api/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      response.data.isAdmin
        ? dispatch(fetchUsers())
        : dispatch(fetchUser(response.data.userId));

      localStorage.setItem("token", JSON.stringify(response.data.jwt));
      return response.data;
    } catch (error) {
      console.error(error.message);
      console.error(error?.response?.data?.message);
      dispatch(setSignUpError(error.response.data.message));
    }
  }
);

export const loginUserByPassword = createAsyncThunk(
  "auth/loginUserByPassword",
  async (user, { dispatch }) => {
    try {
      const response = await usersApi.post("api/auth/signin", user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      response.data.isAdmin
        ? dispatch(fetchUsers())
        : dispatch(fetchUser(response.data.userId));

      localStorage.setItem("token", JSON.stringify(response.data.jwt));

      return response.data;
    } catch (error) {
      console.error(error.message);
      console.error(error?.response?.data?.message);
      dispatch(setSignInError(error.response.data.message));
    }
  }
);

export const loginUserByToken = createAsyncThunk(
  "auth/loginUserByToken",
  async (_, { dispatch }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await usersApi.get("api/auth/login", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token,
        },
      });

      response.data.isAdmin
        ? dispatch(fetchUsers())
        : dispatch(fetchUser(response.data.userId));

      localStorage.setItem("token", JSON.stringify(response.data.jwt));

      return response.data;
    } catch (error) {
      console.error(error.message);
      console.error(error.response.data.message);
      localStorage.removeItem("token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    isAdmin: false,
    usersLoaded: false,
    status: "idle",
    signUpError: null,
    signInError: null,
  },
  reducers: {
    logoutCurrentUser(state, action) {
      state.userId = null;
      state.isAdmin = false;
      state.usersLoaded = false;
      state.signInError = null;
      state.signUpError = null;
      state.status = "idle";
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
        state.userId = action.payload.userId;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUserByPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserByPassword.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(loginUserByPassword.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUserByToken.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserByToken.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(loginUserByToken.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase("users/fetchUsers/fulfilled", (state, action) => {
        state.usersLoaded = true;
        state.status = "idle";
      })
      .addCase("users/fetchUser/fulfilled", (state, action) => {
        state.usersLoaded = true;
        state.status = "idle";
      });

    // builder
    //   .addMatcher(
    //     isAnyOf("users/fetchUser/fulfilled", "users/fetchUsers/fulfilled"),
    //     (state) => {
    //       state.usersLoaded = true;
    //       state.status = "idle";
    //     }
    //   )
    //   .addMatcher(
    //     isAnyOf(
    //       registerUser.pending,
    //       loginUserByPassword.pending,
    //       loginUserByToken.pending
    //     ),
    //     (state) => {
    //       state.status = "loading";
    //     }
    //   )
    //   .addMatcher(
    //     isAnyOf(
    //       registerUser.fulfilled,
    //       loginUserByPassword.fulfilled,
    //       loginUserByToken.fulfilled
    //     ),
    //     (state, action) => {
    //       state.userId = action.payload.userId;
    //       state.isAdmin = action.payload.isAdmin;
    //     }
    //   )
    //   .addMatcher(
    //     isAnyOf(
    //       registerUser.rejected,
    //       loginUserByPassword.rejected,
    //       loginUserByToken.rejected
    //     ),
    //     (state) => {
    //       state.status = "idle";
    //     }
    //   );
  },
});

export const { logoutCurrentUser, setSignUpError, setSignInError } =
  authSlice.actions;
export default authSlice.reducer;
