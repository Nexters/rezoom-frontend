// import { createAction, handleActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const USER_SIGN_UP = 'USER_SIGN_UP';
export const DUPLICATE_USERNAME = 'DUPLICATE_USERNAME';
export const CLEAR_DUPLICATE_USERNAME = 'CLEAR_DUPLICATE_USERNAME';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

export const getJwtToken = state => state.auth.jwt;

const initialState = {
  isLogin: false,
  duplicate: [false, ''],
  loginError: [false, ''],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
      };
    case DUPLICATE_USERNAME:
      return {
        ...state,
        duplicate: [true, action.payload.data],
      };
    case CLEAR_DUPLICATE_USERNAME:
      return {
        ...state,
        duplicate: [false, ''],
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: [true, action.payload.data],
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: [false, ''],
      };
    default:
      return state;
  }
}

export const login = data => ({
  type: LOGIN,
  payload: {
    data,
  },
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const userSignUp = data => ({
  type: USER_SIGN_UP,
  payload: {
    data,
  },
});

export const duplicateUsername = data => ({
  type: DUPLICATE_USERNAME,
  payload: {
    data,
  },
});

export const clearDuplicateUsername = () => ({
  type: CLEAR_DUPLICATE_USERNAME,
});

export const loginError = data => ({
  type: LOGIN_ERROR,
  payload: {
    data,
  },
});

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
});
