// import { combineReducers } from 'redux';
// import { userReducer } from './userReducer';
// export const rootReducer = combineReducers({
//     user: userReducer,
// });

// export default rootReducer;
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
