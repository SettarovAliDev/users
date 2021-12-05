import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("api/users");
  console.log(response.data);
  return response.data;
});

const initialState = {
  status: "idle",
  entities: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const newEntities = {};
        action.payload.forEach((user) => {
          newEntities[`${user.id}`] = user;
        });
        state.entities = newEntities;
        state.status = "idle";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase("currentUser/logoutCurrentUser", (state, action) => {
        state.entities = {};
      });
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
