// import { createAction, handleActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_JWT = 'SET_JWT';

export const getJwtToken = state => state.auth.jwt;

const initialState = {
  isLogin: false,
  jwt: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: !state.isLogin,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case SET_JWT:
      return {
        ...state,
        jwt: action.payload.jwt,
      };
    default:
      return state;
  }
}

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setJWT = jwt => ({
  type: SET_JWT,
  payload: {
    jwt,
  },
});
