import {
  FETCH_BLOG,
  FETCH_BLOG_BY_ID,
  ADD_BLOG,
  UPDATE_BLOG,
  FETCH_BLOG_BY_USERID,
  ADD_COMMENT,
  EDIT_COMMENT
} from "./action-types";

const initialState = {};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG:
      return { ...state, blog_list: action.payload };
    case ADD_BLOG:
      return { ...state, added_blog: action.payload };
    case FETCH_BLOG_BY_ID:
      return { ...state, blogDetail: action.payload };
    case UPDATE_BLOG:
      return { ...state, updateResult: action.payload };
    case FETCH_BLOG_BY_USERID:
      return { ...state, blog_list: action.payload };
    case ADD_COMMENT:
      return { ...state, updateResult: action.payload };
    case EDIT_COMMENT:
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};
