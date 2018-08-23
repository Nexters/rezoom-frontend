import { push, match } from 'connected-react-router';
import { call, fork, take, put } from 'redux-saga/effects';
import {
  LOGIN,
  loginSuccess,
  LOGOUT,
  logoutSuccess,
  USER_SIGN_UP,
  duplicateUsername,
  loginError,
  clearDuplicateUsername,
  clearLoginError,
} from './Auth.store';
import api from '../../service';
import Cookies from 'js-cookie';
import {
  activeLoadingContainer,
  inactiveLoadingContainer,
} from '../Loader/Loader.store';
import { openSnackbar } from '../Snackbar/Snackbar.store';

export function* login(data) {
  try {
    yield put(activeLoadingContainer());

    const params = {
      username: data.username,
      password: data.password,
    };

    const result = yield call(api.login, params);

    if (result.status === 400) {
      yield put(
        loginError(
          '등록되지 않은 아이디거나, 아이디 혹은 비밀번호를 잘못 입력하셨습니다.',
        ),
      );
      yield put(
        openSnackbar({
          variant: 'error',
          message: '로그인에 실패하였습니다.',
        }),
      );
    } else {
      Cookies.set('jwt', result.data);
      yield put(clearLoginError());
      yield put(
        openSnackbar({
          variant: 'success',
          message: `${data.username}님 안녕하세요.`,
        }),
      );
      yield put(loginSuccess());
    }
    yield put(inactiveLoadingContainer());
  } catch (e) {
    throw e;
  }
}

export function* logout() {
  try {
    Cookies.remove('jwt');
    yield put(logoutSuccess());
    yield put(
      openSnackbar({
        variant: 'success',
        message: 'Rezoom을 사용해 주셔서 감사합니다.',
      }),
    );
  } catch (e) {
    throw e;
  }
}

export function* signUp(data) {
  try {
    yield put(activeLoadingContainer());

    const params = {
      // name: data.name,
      username: data.username,
      password: data.password,
    };

    const result = yield call(api.signUp, params);

    if (result.status === 400) {
      yield put(duplicateUsername(result.message));
      yield put(
        openSnackbar({
          variant: 'error',
          message: '회원가입에 실패하였습니다.',
        }),
      );
    } else {
      yield put(clearDuplicateUsername());
      yield put(push(`/login`));
      yield put(
        openSnackbar({
          variant: 'success',
          message: 'Rezoom 회원가입을 축하드립니다.',
        }),
      );
    }
    yield put(inactiveLoadingContainer());
  } catch (e) {
    console.log(e);
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

export function* watchUserSignUp() {
  while (true) {
    const { payload } = yield take(USER_SIGN_UP);
    yield call(signUp, payload.data);
  }
}

export default function*() {
  yield fork(watchLoginRequest);
  yield fork(watchLogout);
  yield fork(watchUserSignUp);
}
