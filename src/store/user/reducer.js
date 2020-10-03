import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from "./action-types";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, logged_user: action.payload };
    case LOGOUT_USER:
      return { ...state, logged_user: action.payload };
    case SIGNUP_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
