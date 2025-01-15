const initialState = {
    phone: "",
    address: "",
  };
  
  export const userProfileReducer = (state = initialState, action) => {
    console.log("userProfileReducer action:", action); // Log action
    switch (action.type) {
      case "UPDATE_USER_PROFILE":
        return {
          ...state,
          phone: action.payload.phone,
          address: action.payload.address,
        };
      default:
        return state;
    }
  };
  