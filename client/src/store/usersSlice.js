import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
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
  "users/addProfile",
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

export const editProfile = createAsyncThunk(
  "users/editProfile",
  async (profile, { rejectWithValue }) => {
    try {
      const response = await usersApi.put(
        `api/profiles/${profile.profileId}`,
        profile,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
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
  entities: null,
  status: "idle",
  addProfileStatus: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder
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
      .addCase(addProfile.fulfilled, (state, action) => {
        const { userId, profile } = action.payload;
        state.entities[userId].profiles[profile.id] = profile;
        state.addProfileStatus = "idle";
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        const { userId, profile } = action.payload;
        state.entities[userId].profiles[profile.id] = profile;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        const { userId, profileId } = action.payload;
        delete state.entities[userId].profiles[profileId];
      })
      .addCase("auth/logoutCurrentUser", (state, action) => {
        state.entities = null;
      })
      .addCase(addProfile.pending, (state) => {
        state.addProfileStatus = "loading";
      })
      .addCase(editProfile.pending, (state) => {})
      .addCase(addProfile.rejected, (state) => {
        state.addProfileStatus = "idle";
      })
      .addCase(editProfile.rejected, (state) => {})
      .addMatcher(isAnyOf(fetchUsers.pending, fetchUser.pending), (state) => {
        state.status = "loading";
      })
      .addMatcher(isAnyOf(fetchUsers.rejected, fetchUser.rejected), (state) => {
        state.status = "idle";
      });
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
