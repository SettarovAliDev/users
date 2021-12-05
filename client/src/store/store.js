import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./currentUser/currentUserSlice";
import usersReducer from "./users/usersSlice";
import profilesReducer from "./profiles/profilesSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersReducer,
    profiles: profilesReducer,
  },
});

export default store;
