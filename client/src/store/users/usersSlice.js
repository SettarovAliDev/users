import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("users");
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
          newEntities[user.user_id] = user;
        });
        state.entities = newEntities;
        state.status = "idle";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

// export const {} = usersSlice.actions;
export default usersSlice.reducer;
