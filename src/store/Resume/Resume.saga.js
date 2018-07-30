import { push } from 'connected-react-router';
import { call, fork, take, put } from 'redux-saga/effects';
import {
  REQUEST_CREATE_NEW_RESUME,
  responseCreateNewResume,
} from './Resume.store';

function* postCreateNewResume(data) {
  try {
    console.log('postCreateNewResume data = ', data);

    // resumeId
    data.id = 1;
    // 성공 후
    yield put(responseCreateNewResume(data));
    yield put(push(`/resume/create/${data.id}`));
  } catch (error) {
    console.log(error);
  }
}

export function* watchCreateNewResume() {
  while (true) {
    const { payload } = yield take(REQUEST_CREATE_NEW_RESUME);
    yield call(postCreateNewResume, payload['data']);
  }
}

export default function*() {
  yield fork(watchCreateNewResume);
}
