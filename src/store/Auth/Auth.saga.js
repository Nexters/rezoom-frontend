import { call, fork, take } from 'redux-saga/effects';
import { LOGIN } from './Auth.store';
import Api from '../../service/Api';

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
    /*
     *
     * TODO: 여기 로그인 API사용
     * API 작성
     *  1. /src/service/(API이름)
     *  2. /src/service/Resume.js 참조
     *  3. /src/store/Resume.saga.js -> Api호출 참조
     * 
     * 원래 사가로 api를 들고와야하는데 그 부분은 수정못함.. 
     * 
     */
    // Api.get('http://172.30.1.26:8080/login/github');
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
  yield fork(watchLoginRequest);
}
