import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import usersApi from '../api/usersApi';

import { fetchUsers, fetchUser } from './usersSlice';

const authCallback =
  (route) =>
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const response = await usersApi.post(`api/auth/${route}`, user, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      response.data.isAdmin
        ? dispatch(fetchUsers())
        : dispatch(fetchUser(response.data.userId));

      localStorage.setItem('token', JSON.stringify(response.data.jwt));

      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  };

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  authCallback('signup')
);

export const loginUserByPassword = createAsyncThunk(
  'auth/loginUserByPassword',
  authCallback('signin')
);

export const loginUserByToken = createAsyncThunk(
  'auth/loginUserByToken',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await usersApi.get('api/auth/login', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-access-token': token,
        },
      });

      response.data.isAdmin
        ? dispatch(fetchUsers())
        : dispatch(fetchUser(response.data.userId));

      localStorage.setItem('token', JSON.stringify(response.data.jwt));

      return response.data;
    } catch (error) {
      console.error(error.message);
      localStorage.removeItem('token');
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    isAdmin: false,
    usersLoaded: false,
    loading: false,
    errors: {
      signUpError: null,
      signInError: null,
    },
  },
  reducers: {
    logoutCurrentUser(state, action) {
      state.userId = null;
      state.isAdmin = false;
      state.usersLoaded = false;
      state.loading = false;
      state.errors.signInError = null;
      state.errors.signUpError = null;
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
          state.loading = true;
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
          state.errors.signInError = null;
          state.errors.signUpError = null;
        }
      )
      .addMatcher(isAnyOf(registerUser.rejected), (state, action) => {
        state.loading = false;
        state.errors.signUpError = action.payload;
        state.errors.signInError = null;
      })
      .addMatcher(
        isAnyOf(loginUserByPassword.rejected, loginUserByToken.rejected),
        (state, action) => {
          state.loading = false;
          state.errors.signInError = action.payload;
          state.errors.signUpError = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.fulfilled, fetchUser.fulfilled),
        (state) => {
          state.usersLoaded = true;
          state.loading = false;
        }
      );
  },
});

export const { logoutCurrentUser } = authSlice.actions;
export default authSlice.reducer;
