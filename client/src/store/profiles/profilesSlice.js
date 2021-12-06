import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  entities: {},
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {},
});

export default profilesSlice.reducer;
