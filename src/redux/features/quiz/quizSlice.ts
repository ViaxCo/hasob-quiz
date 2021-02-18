import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../../../utils";
import { AppDispatch } from "../../store";
import { logout } from "../user/userSlice";

// Question type
export type QuestionType = {
  id?: number;
  question: string;
  answers: Answer[];
  time: number;
};

// Answer type
type Answer = {
  id?: number;
  questionId?: number;
  answer: string;
  correct?: boolean;
};

// Slice type
export type QuizSlice = {
  title: string;
  description: string;
  questions: QuestionType[];
  totalTime: number;
  isLoading: boolean;
  submitting: boolean;
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    title: "",
    description: "",
    questions: [] as QuestionType[],
    totalTime: 0,
    isLoading: true,
    submitting: false,
  } as QuizSlice,
  reducers: {
    quizReceived(state, { payload: quiz }) {
      state.isLoading = false;
      state.title = quiz.title;
      state.description = quiz.description;
      state.questions = quiz.questions;
      state.totalTime = quiz.totalTime;
    },
    questionAdded(state, action) {
      state.questions.push(action.payload as QuestionType);
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSubmitting(state, action) {
      state.submitting = action.payload;
    },
  },
});

export const getQuiz = () => async (dispatch: AppDispatch) => {
  const res = await axios.get("https://hasquiz-api.herokuapp.com/api/quiz");
  console.log(res);
  const { data, status } = res.data;
  // data = [{quiz1},{quiz2}...]
  if (status === "Token is Expired") dispatch(logout());
  dispatch(quizReceived(data[0]));
};

export const addQuestion = (newQuestion: QuestionType) => async (
  dispatch: AppDispatch
) => {
  dispatch(setSubmitting(true));
  const res = await axios.post(
    "https://hasquiz-api.herokuapp.com/api/questions",
    newQuestion
  );
  console.log(res);
  dispatch(setSubmitting(false));
  const { question, message, status } = res.data;
  if (message === "Question and answers created successfully")
    dispatch(questionAdded(question));
  history.push("/questions");
  if (status === "Token is Expired") dispatch(logout());
};

export const {
  quizReceived,
  questionAdded,
  setIsLoading,
  setSubmitting,
} = quizSlice.actions;
export default quizSlice.reducer;
