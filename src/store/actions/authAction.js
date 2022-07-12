import * as actions from "../actionTypes/authActionTypes";
import * as msgactions from "../actionTypes/commonActionTypes";
import tokenAuthService from "../../services/tokenAuth/tokenAuthService";
import config from '../../config/config'
const bcrypt = require('bcryptjs')

//action to set the APIError
export function setAPIError(apierror) {
  return {
    type: actions.SET_API_ERROR,
    payload: apierror,
  };
}

export const userSignIn = (user) => {
  return {
    type: actions.SIGNIN_USER,
    payload: user,
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    try {
      tokenAuthService.logout();
    } catch (error) {
      throw error;
    }
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: actions.SIGNIN_USER_SUCCESS,
    payload: authUser,
  };
};

export const userSignOutSuccess = () => {
  return {
    type: actions.SIGNOUT_USER_SUCCESS,
  };
};

export const showAuthMessage = (message) => {
  return {
    type: msgactions.SHOW_MESSAGE,
    payload: message,
  };
};

export const userGoogleSignIn = () => {
  return {
    type: actions.SIGNIN_GOOGLE_USER,
  };
};
export const userGoogleSignInSuccess = (authUser) => {
  return {
    type: actions.SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser,
  };
};
export const userFacebookSignIn = () => {
  return {
    type: actions.SIGNIN_FACEBOOK_USER,
  };
};
export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: actions.SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser,
  };
};
export const setInitUrl = (url) => {
  return {
    type: actions.INIT_URL,
    payload: url,
  };
};

export const setupDataOnLoad = () => {
  return function (dispatch) {
    // Check localstorage

    let lsPass = JSON.parse(
      localStorage.getItem(config.localStorageVariables.password)
    )
    let lsEmail = JSON.parse(
      localStorage.getItem(config.localStorageVariables.email)
    )

    if (lsPass) {
      dispatch({
        type: actions.SETUP_ON_LOAD,
        password: lsPass,
        email: lsEmail,
      })
    }
  }
}

export const showAnOverlay = (type, data) => {
  return function (dispatch) {
    dispatch({
      type: actions.SHOW_AN_OVERLAY,
      overlay: {
        type,
        data,
      },
    })
  }
}

export const userSignup = (email, password) => {
  return function (dispatch) {
    console.log(email, password)

    const hashedPassword = bcrypt.hashSync(password)

    let request = {
      method: 'POST',
      body: JSON.stringify({ email, passwordHash: hashedPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(config.backendUrl + '/api/users/user-signup', request)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json)
            dispatch({
              type: actions.SIGNUP_WITH_EMAIL,
            })
            return true
          })
        } else {
          console.log('ERROR READING JSON')
          response.json().then((json) => {
            console.log(json)
            return false
          })
        }
      })
      .catch((err) => {
        console.log('ERROR WITH FETCH REQ')
        console.log(err)
      })
  }
}

export const userLogin = (email, password) => {
  return function (dispatch) {
    console.log(password)

    let request = {
      method: 'POST',
      body: JSON.stringify({ email, passwordHash: 'test' }),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(config.backendUrl + '/api/users/user-login', request)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json)
            localStorage.setItem(
              config.localStorageVariables.password,
              JSON.stringify(password)
            )

            dispatch({
              type: actions.SIGNIN_WITH_PASSWORD,
              userPassword: password,
            })
            return true
          })
        } else {
          console.log('ERROR READING JSON')
          response.json().then((json) => {
            console.log(json)
            dispatch({
              type: actions.SIGNIN_WITH_PASSWORD_FAIL,
            })
            return false
          })
        }
      })
      .catch((err) => {
        console.log('ERROR WITH FETCH REQ')
        console.log(err)
      })
  }
}
