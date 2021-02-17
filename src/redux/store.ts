import { configureStore } from "@reduxjs/toolkit";

// State type
export type State = {};

const store = configureStore({
  reducer: {},
});

export type AppDispatch = typeof store.dispatch;
export default store;
