import request from "../../api/request";
import {
  FETCH_BLOG,
  FETCH_BLOG_BY_ID,
  ADD_BLOG,
  UPDATE_BLOG,
  FETCH_BLOG_BY_USERID
} from "./action-types";

export const fetchBlogList = () => {
  return async dispatch => {
    const responseData = await request({
      url: "/blog/list",
      method: "GET"
    });
    dispatch({ type: FETCH_BLOG, payload: responseData });
  };
};

export const fetchBlogById = data => {
  console.log("The data");
  console.log(data);
  return async dispatch => {
    const responseData = await request({
      url: `/blog/listbyId/${data}`,
      method: "GET",
      data: data
    });
    dispatch({ type: FETCH_BLOG_BY_ID, payload: responseData });
  };
};

export const fetchBlogByUserId = data => {
  console.log("The data");
  console.log(data);
  return async dispatch => {
    const responseData = await request({
      url: `/blog/listBlogsByUserId/${data}`,
      method: "GET",
      data: data
    });
    dispatch({ type: FETCH_BLOG_BY_USERID, payload: responseData });
  };
};

export const addBlog = data => {
  return async dispatch => {
    const responseData = await request({
      url: "/blog/addBlog",
      method: "POST",
      data: data
    });
    dispatch({ type: ADD_BLOG, payload: responseData });
  };
};

export const updateBlog = data => {
  return async dispatch => {
    const responseData = await request({
      url: "/blog/editBlog",
      method: "PUT",
      data: data
    });
    dispatch({ type: UPDATE_BLOG, payload: responseData });
  };
};
