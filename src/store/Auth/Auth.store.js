import { createAction, handleActions } from 'redux-actions';

export const LOGIN = 'LOGIN'

const initialState = {
    isLogin: false,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogin : !this.state.isLogin
            }
        default:
          return state
    }
}

export const login = () => ({
    type: LOGIN
});

