import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/quiz/quizSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer
  }
  // devTools: false
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
