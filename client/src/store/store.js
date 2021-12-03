import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users/usersSlice";
import currentUserReducer from "./currentUser/currentUserSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
  },
});

export default store;
