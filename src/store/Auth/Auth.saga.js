import { call, fork, take, put } from 'redux-saga/effects';
import { LOGIN, loginSuccess, LOGOUT, logoutSuccess } from './Auth.store';
import api from '../../service';
import Cookies from 'js-cookie';

export function* login(data) {
  try {
    const params = {
      username: data.username,
      password: data.password,
    };

    const result = yield call(api.login, params);
    console.log(result);

    Cookies.set('jwt', result.data);

    yield put(loginSuccess());
  } catch (e) {
    throw e;
  }
}

export function* logout() {
  try {
    Cookies.remove('jwt');
    yield put(logoutSuccess());
  } catch (e) {
    throw e;
  }
}

export function* watchLoginRequest() {
  while (true) {
    const { payload } = yield take(LOGIN);
    yield call(login, payload.data);
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);
    yield call(logout);
  }
}

export default function*() {
  yield fork(watchLoginRequest);
  yield fork(watchLogout);
}
