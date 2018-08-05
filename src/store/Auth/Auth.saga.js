import { call, fork, take } from 'redux-saga/effects';
import { LOGIN } from './Auth.store';
import api from '../../service';

export function* login() {
  try {
    const result = yield call(api.login, 'login', {
      username: 'jaeeonjin',
      password: 'test',
    });

    console.log('login result = ', result);
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
     * redux-saga
     *  1. export default function* () 함수에서 yield fork로 init시에 이벤트를 감시하고있는다
     *  2. watchLoginRequest() 의 while이 true로 무한 루프를 돌며 yield take(LOGIN) 감시
     *  3. store의 action이 실행되면 yield take(LOGIN) 을 실행하고 yield call(login) 실행
     *  4. 현재 login() 함수 실행
     */
    // Api.get('http://172.30.1.26:8080/login/github');
  } catch (e) {
    // yield put(loginFailure());
    throw e;
  }
}

export function* watchLoginRequest() {
  while (true) {
    const { payload } = yield take(LOGIN);
    yield call(login);
  }
}

export default function*() {
  yield fork(watchLoginRequest);
}
