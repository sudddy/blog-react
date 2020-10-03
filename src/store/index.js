import { combineReducers } from "redux";

import { blogReducer } from "./blog";
import { userReducer } from "./user";

export default combineReducers({
  user: userReducer,
  blogDetails: blogReducer
});
