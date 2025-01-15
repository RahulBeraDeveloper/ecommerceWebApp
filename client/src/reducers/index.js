import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { CODReducer } from "./CODReducer";
import { userProfileReducer } from "./userProfileReducer";  // Add this import
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  COD: CODReducer,
  userProfile: userProfileReducer, // Add this line
});

export default rootReducer;
