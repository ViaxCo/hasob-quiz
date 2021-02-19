import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../../../utils";
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
  isLoading: null | boolean;
  submitting: boolean;
};

export const getQuiz = createAsyncThunk(
  "quiz/getQuiz",
  async (_, { dispatch }) => {
    try {
      const res = await axios.get("https://hasquiz-api.herokuapp.com/api/quiz");
      console.log(res);
      const { data } = res.data;
      // data = [{quiz1},{quiz2}...]
      return data[0];
    } catch (error) {
      console.log({ ...error });
      if (error.response.data.status === "Token is Expired") dispatch(logout());
    }
  }
);

export const addQuestion = createAsyncThunk(
  "quiz/addQuestion",
  async (newQuestion: QuestionType, { dispatch }) => {
    try {
      const res = await axios.post(
        "https://hasquiz-api.herokuapp.com/api/questions",
        newQuestion
      );
      console.log(res);
      const { question, message } = res.data;
      if (message === "Question and answers created successfully")
        return question;
    } catch (error) {
      console.log({ ...error });
      if (error.response.data.status === "Token is Expired") dispatch(logout());
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    title: "",
    description: "",
    questions: [] as QuestionType[],
    totalTime: 0,
    isLoading: null,
    submitting: false,
  } as QuizSlice,
  reducers: {},
  extraReducers: builder => {
    // getQuiz
    builder.addCase(getQuiz.pending, (state, action) => {
      if (state.questions.length === 0) state.isLoading = true;
    });
    builder.addCase(getQuiz.fulfilled, (state, { payload: quiz }) => {
      state.isLoading = false;
      state.title = quiz.title;
      state.description = quiz.description;
      state.questions = quiz.questions;
      state.totalTime = quiz.totalTime;
    });
    // addQuestion
    builder.addCase(addQuestion.pending, (state, action) => {
      state.submitting = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, { payload: question }) => {
      state.submitting = false;
      state.questions.push(question);
      history.push("/questions");
    });
  },
});

export default quizSlice.reducer;
