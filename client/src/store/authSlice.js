import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import usersApi from "../api/usersApi";

import { fetchUsers, fetchUser } from "./usersSlice";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { dispatch, rejectWithValue }) => {
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUserByPassword = createAsyncThunk(
  "auth/loginUserByPassword",
  async (user, { dispatch, rejectWithValue }) => {
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUserByToken = createAsyncThunk(
  "auth/loginUserByToken",
  async (_, { dispatch, rejectWithValue }) => {
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
      localStorage.removeItem("token");
      return rejectWithValue(error.response.data.message);
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
  },
  extraReducers: (builder) => {
    return builder
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          loginUserByPassword.pending,
          loginUserByToken.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.fulfilled,
          loginUserByPassword.fulfilled,
          loginUserByToken.fulfilled
        ),
        (state, action) => {
          state.userId = action.payload.userId;
          state.isAdmin = action.payload.isAdmin;
          state.signInError = null;
          state.signUpError = null;
        }
      )
      .addMatcher(isAnyOf(registerUser.rejected), (state, action) => {
        state.status = "idle";
        state.signUpError = action.payload;
        state.signInError = null;
      })
      .addMatcher(
        isAnyOf(loginUserByPassword.rejected, loginUserByToken.rejected),
        (state, action) => {
          state.status = "idle";
          state.signInError = action.payload;
          state.signUpError = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.fulfilled, fetchUser.fulfilled),
        (state) => {
          state.usersLoaded = true;
          state.status = "idle";
        }
      );
  },
});

export const { logoutCurrentUser } = authSlice.actions;
export default authSlice.reducer;
