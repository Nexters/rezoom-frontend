import { push } from 'connected-react-router';
import { call, fork, take, put } from 'redux-saga/effects';
import { CREATE_NEW_RESUME, TEST_FETCH } from './Resume.store';

function* postCreateNewResume(data) {
  try {
    console.log('postCreateNewResume data = ', data);
    yield put(push('/resume/create'));
  } catch (error) {
    console.log(error);
  }
}

export function* watchCreateNewResume() {
  while (true) {
    const { payload } = yield take(CREATE_NEW_RESUME);
    yield call(postCreateNewResume, payload['data']);
  }
}

export default function*() {
  yield fork(watchCreateNewResume);
}
