import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersApi from '../api/usersApi';

import { logoutCurrentUser, loginUserByToken } from './authSlice';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersApi.get('api/users');
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await usersApi.get(`api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await usersApi.put(`api/users/${user.userId}`, user);
      if (
        response.data.id === getState().auth.userId &&
        response.data.roles.length === 1
      ) {
        dispatch(loginUserByToken());
      }
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ userId, currentUserId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await usersApi.delete(`api/users/${userId}`);
      const isCurrentUser = response.data === currentUserId;
      if (isCurrentUser) {
        localStorage.removeItem('token');
        dispatch(logoutCurrentUser());
      }
      return { userId: response.data, isCurrentUser };
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addProfile = createAsyncThunk(
  'users/addProfile',
  async (profile, { rejectWithValue }) => {
    try {
      const response = await usersApi.post('api/profiles', profile);
      return { profile: response.data, userId: profile.userId };
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  'users/editProfile',
  async (profile, { rejectWithValue }) => {
    try {
      const response = await usersApi.put(
        `api/profiles/${profile.profileId}`,
        profile
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  'users/deleteProfile',
  async ({ userId, profileId }, { rejectWithValue }) => {
    try {
      const response = await usersApi.delete(`api/profiles/${profileId}`);
      return { userId, profileId: response.data };
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    loaders: {
      addProfileLoading: false,
      editUserLoading: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    return builder
      .addCase(editUser.pending, (state) => {
        state.loaders.editUserLoading = true;
      })
      .addCase(addProfile.pending, (state) => {
        state.loaders.addProfileLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const normalizedUsers = {};
        action.payload.forEach((user) => {
          const normalizedProfiles = {};
          user.profiles.forEach((profile) => {
            normalizedProfiles[`${profile.id}`] = profile;
          });
          normalizedUsers[`${user.id}`] = {
            ...user,
            profiles: normalizedProfiles,
          };
        });
        state.entities = normalizedUsers;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const normalizedProfiles = {};
        action.payload.profiles.forEach((profile) => {
          normalizedProfiles[`${profile.id}`] = profile;
        });

        state.entities = {
          [action.payload.id]: {
            ...action.payload,
            profiles: normalizedProfiles,
          },
        };
      })
      .addCase(editUser.fulfilled, (state, action) => {
        console.log(action.payload);
        const { id } = action.payload;
        state.entities[id] = action.payload;
        state.loaders.editUserLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { userId, isCurrentUser } = action.payload;
        if (!isCurrentUser) delete state.entities[userId];
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        const { userId, profile } = action.payload;
        state.entities[userId].profiles[profile.id] = profile;
        state.loaders.addProfileLoading = false;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        const { userId, profile } = action.payload;
        state.entities[userId].profiles[profile.id] = profile;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        const { userId, profileId } = action.payload;
        delete state.entities[userId].profiles[profileId];
      })
      .addCase(addProfile.rejected, (state) => {
        state.loaders.addProfileLoading = false;
      })
      .addCase('auth/logoutCurrentUser', (state, action) => {
        state.entities = null;
      });
  },
});

export default usersSlice.reducer;
