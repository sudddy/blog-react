import request from "../../api/request";
import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from "./action-types";

export const loginUser = data => {
  return async dispatch => {
    const responseData = await request({
      url: "/user/login",
      method: "POST",
      data: data
    });
    dispatch({ type: LOGIN_USER, payload: responseData });
  };
};

export const logoutUser = () => {
  return dispatch => {
    const responseData = {};
    dispatch({ type: LOGOUT_USER, payload: responseData });
  };
};

export const registerUser = data => {
  return async dispatch => {
    const responseData = await request({
      url: "/user/signup",
      method: "POST",
      data: data
    });
    dispatch({ type: SIGNUP_USER, payload: responseData });
  };
};
