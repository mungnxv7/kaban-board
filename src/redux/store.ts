import { configureStore } from "@reduxjs/toolkit";
import columnSlice from "./columns/columnSlice";

const store = configureStore({
  reducer: {
    column: columnSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
