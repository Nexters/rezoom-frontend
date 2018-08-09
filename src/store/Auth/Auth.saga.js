import { call, fork, take, put } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN, setJWT } from './Auth.store';
import api from '../../service';

export function* login() {
  try {
    const params = {
      username: 'jaeeonjin',
      password: 'test',
    };

    const result = yield call(api.login, params);
    console.log(result);

    yield put(setJWT(result.data));
  } catch (e) {
    throw e;
  }
}

export function* watchLoginRequest() {
  while (true) {
    yield take(LOGIN);
    yield call(login);
  }
}

export default function*() {
  yield fork(watchLoginRequest);
}
