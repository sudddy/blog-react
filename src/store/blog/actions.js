import request from "../../api/request";
import {
  FETCH_BLOG,
  FETCH_BLOG_BY_ID,
  ADD_BLOG,
  UPDATE_BLOG,
  FETCH_BLOG_BY_USERID,
  ADD_COMMENT,
  EDIT_COMMENT
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

export const addComment = data => {
  return async dispatch => {
    const responseData = await request({
      url: "/blog/addComment",
      method: "POST",
      data: data
    });
    dispatch({ type: ADD_COMMENT, payload: responseData });
  };
};

export const editComment = data => {
  return async dispatch => {
    const responseData = await request({
      url: "/blog/editComment",
      method: "PUT",
      data: data
    });
    dispatch({ type: EDIT_COMMENT, payload: responseData });
  };
};
