// import { createAction, handleActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const getJwtToken = state => state.auth.jwt;

const initialState = {
  isLogin: false,
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
