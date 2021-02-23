import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserAnswer } from "../../../pages/StartQuiz";
import { history } from "../../../utils";
import { logout } from "../user/userSlice";

// Quiz type
type Quiz = {
  id?: number;
  title?: string;
  description?: string;
  questions?: QuestionType[];
  totalQuestions?: number;
  totalTime?: number;
};

// Question type
export type QuestionType = {
  id?: number;
  quizId?: number;
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

// Quiz submission type
type QuizSubmission = {
  userAnswers: UserAnswer[];
  quizId: number;
};

// Slice type
type QuizSliceState = {
  quiz: Quiz;
  isLoading: null | boolean;
  submitting: boolean;
};

const initialState: QuizSliceState = {
  quiz: {} as Quiz,
  isLoading: null,
  submitting: false,
};

export const getQuiz = createAsyncThunk(
  "quiz/getQuiz",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get("quiz");
      console.log(res);
      const { data } = res.data;
      // data = [{quiz1},{quiz2}...]
      return data[0] as Quiz;
    } catch (error) {
      console.log({ ...error });
      if (!error.response) throw error;
      if (error.response.data.status === "Token is Expired") dispatch(logout());
      return rejectWithValue(error.response.data);
    }
  }
);

export const addQuestion = createAsyncThunk(
  "quiz/addQuestion",
  async (newQuestion: QuestionType, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post("questions", newQuestion);
      console.log(res);
      const { question } = res.data;
      history.push("/questions");
      return question as QuestionType;
    } catch (error) {
      console.log({ ...error });
      if (!error.response) throw error;
      if (error.response.data.status === "Token is Expired") dispatch(logout());
      return rejectWithValue(error.response.data);
    }
  }
);

export const submitQuiz = createAsyncThunk(
  "quiz/submitQuiz",
  async (quizSubmission: QuizSubmission, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post("submit", quizSubmission);
      console.log(res);
      const { correctCount } = res.data.meta;
      history.push("/");
      return correctCount as number;
    } catch (error) {
      console.log({ ...error });
      if (!error.response) throw error;
      if (error.response.data.status === "Token is Expired") dispatch(logout());
      return rejectWithValue(error.response.data);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuiz(state, action: PayloadAction<undefined>) {
      state.quiz = {};
      state.isLoading = null;
    },
  },
  extraReducers: builder => {
    // getQuiz
    builder.addCase(getQuiz.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getQuiz.fulfilled, (state, { payload: quiz }) => {
      state.isLoading = false;
      state.quiz = quiz;
    });
    builder.addCase(getQuiz.rejected, (state, action) => {
      state.isLoading = null;
      console.log(action.payload);
    });
    // addQuestion
    builder.addCase(addQuestion.pending, (state, action) => {
      state.submitting = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, { payload: question }) => {
      state.submitting = false;
      state.quiz.questions?.push(question);
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.submitting = false;
      console.log(action.payload);
    });
    // submitQuiz
    builder.addCase(submitQuiz.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
