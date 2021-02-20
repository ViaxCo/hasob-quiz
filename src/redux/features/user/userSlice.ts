import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { history, setAuthToken } from "../../../utils";
import axios from "axios";
import { AppDispatch } from "../../store";
import { resetQuiz } from "../quiz/quizSlice";

// User type
type User = {
  email: string;
  password: string;
};

// New User type
type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

// Slice type
type UserSliceState = {
  isAuthenticated: boolean;
  role: "Admin" | "User" | "";
};

const initialState: UserSliceState = {
  isAuthenticated: false,
  role: ""
};

export const login = createAsyncThunk(
  "user/login",
  async (user: User, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://hasquiz-api.herokuapp.com/api/auth/login",
        user
      );
      const token = res.data.data.accessToken;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const { role } = res.data.data.user;
      localStorage.setItem("role", role);
      if (role === "Admin") {
        history.push("/questions");
      }
      if (role === "User") {
        history.push("/");
      }
      return role as typeof initialState.role;
    } catch (error) {
      console.log({ ...error });
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (user: NewUser, { rejectWithValue }) => {
    try {
      await axios.post(
        "https://hasquiz-api.herokuapp.com/api/auth/register",
        user
      );
      history.push("/login");
    } catch (error) {
      console.log({ ...error });
      if (!error.response) throw error;
      return rejectWithValue(error.response.data.email[0]);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(
      state,
      { payload: role }: PayloadAction<typeof initialState.role>
    ) {
      state.isAuthenticated = true;
      state.role = role;
    },
    logoutCurrentUser(state, action: PayloadAction<undefined>) {
      state.isAuthenticated = false;
      state.role = "";
    }
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, { payload: role }) => {
      state.isAuthenticated = true;
      state.role = role;
    });
  }
});

export const { setCurrentUser, logoutCurrentUser } = userSlice.actions;

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("role");
  setAuthToken("");
  dispatch(logoutCurrentUser());
  dispatch(resetQuiz());
  history.push("/login");
};

export default userSlice.reducer;
