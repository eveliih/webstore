import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storageService from "../services/storage";
import { notify } from "./notificationReducer";

const initialState = null;

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { set, clear } = slice.actions;

export const registerUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.register(credentials);
      if (user.error) {
        throw new Error(user.error);
      }
      dispatch(notify("Account created successfully! You can log in now."));
    } catch (e) {
      dispatch(notify(e.message, "error"));
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      if (user.error) {
        throw new Error(user.error);
      }
      storageService.saveUser(user);
      dispatch(set(user));
      dispatch(notify("Welcome " + user.name + "!"));
    } catch (e) {
      if (e.message.includes("invalid username or password")) {
        dispatch(notify("Wrong username or password.", "error"));
      } else {
        dispatch(notify("Login failed. Please try again", "error"));
      }
      console.log("loginUser error", e);
    }
  };
};

export const initUser = () => {
  return async (dispatch) => {
    const user = storageService.loadUser();
    dispatch(set(user));
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    storageService.removeUser();
    dispatch(clear());
  };
};

export default slice.reducer;
