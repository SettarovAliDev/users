import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./currentUserSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersReducer,
  },
});

export default store;
