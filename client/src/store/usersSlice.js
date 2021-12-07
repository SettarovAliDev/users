import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../api/usersApi";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await usersApi.get("api/users");
  return response.data;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const response = await usersApi.get(`api/users/${userId}`);
  return response.data;
});

export const addProfile = createAsyncThunk(
  "currentUser/addProfile",
  async (profile) => {
    const response = await usersApi.post("api/profiles", profile, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { profile: response.data, userId: profile.userId };
  }
);

export const deleteProfile = createAsyncThunk(
  "users/deleteProfile",
  async ({ userId, profileId }) => {
    const response = await usersApi.delete(`api/profiles/${profileId}`);
    console.log(response);
    return { userId, profileId: response.data };
  }
);

const initialState = {
  status: "idle",
  entities: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
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
        state.status = "idle";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
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
        state.status = "idle";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(addProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        const { userId, profile } = action.payload;
        state.entities[userId].profiles[profile.id] = profile;
        state.status = "idle";
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        const { userId, profileId } = action.payload;
        state.status = "idle";
        delete state.entities[userId].profiles[profileId];
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase("auth/logoutCurrentUser", (state, action) => {
        state.entities = null;
      });
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
