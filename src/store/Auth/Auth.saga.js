import { call, fork, take } from 'redux-saga/effects';
import { LOGIN } from './Auth.store';

export function* login() {
  try {
    // const test = yield call(api, payload);
    // const result = yield call(api.login, payload);
    // if (result.isLoginSuccess) {
    //   const user = JSON.parse(atob(result.token.split('.')[1]));
    //   result.email = payload.email;
    //   yield put(loginSuccess(result, user.roles));
    // }else {
    //     yield put(loginFailure());
    // }
  } catch (e) {
    // yield put(loginFailure());
    throw e;
  }
}

export function* watchLoginRequest(api) {
  while (true) {
    const { payload } = yield take(LOGIN);
    yield call(login);
  }
}

export default function*() {
  // yield fork(watchLoginRequest);
}
