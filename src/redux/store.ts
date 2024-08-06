import { configureStore } from "@reduxjs/toolkit";
import columnSlice from "./columns/columnSlice";

const store = configureStore({
  reducer: {
    column: columnSlice,
  },
});

export default store;
