import * as actions from "../actionTypes/authActionTypes";

const initialState = {
  singleCoinData: {},
  apiError: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_API_ERROR:
      state = action.payload;
      break;
    case actions.SETUP_ON_LOAD:
      return Object.assign({}, state, {
        userLoggedIn: true,
      });

    case actions.SHOW_AN_OVERLAY:
      return Object.assign({}, state, {
        overlay: action.overlay,
      });

    case actions.SIGNUP_WITH_EMAIL:
      return Object.assign({}, state, {
        emailSignupSuccess: true,
      });

    case actions.SIGNIN_WITH_PASSWORD:
      return Object.assign({}, state, {
        userLoggedIn: true,
      });
    default:
      state = {};
  }
  return state;
};

export default authReducer;
