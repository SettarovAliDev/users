import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";

export const addProfile = createAsyncThunk(
  "profiles/addProfile",
  async (profile, { dispatch, getState }) => {
    console.log(profile);
    const response = await usersApi.post(
      "api/profiles",
      { ...profile, currentUserId: 2 },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // console.log({ ...profile, id: getState().curentUser.user.id });
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  status: "idle",
  entities: {},
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.status = "idle";
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export default profilesSlice.reducer;
