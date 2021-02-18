import { configureStore } from "@reduxjs/toolkit";
import quizReducer, { QuizSlice } from "./features/quiz/quizSlice";
import userReducer, { UserSlice } from "./features/user/userSlice";

// State type
export type State = {
  quiz: QuizSlice;
  user: UserSlice;
};

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
  },
  // devTools: false
});

export type AppDispatch = typeof store.dispatch;
export default store;
