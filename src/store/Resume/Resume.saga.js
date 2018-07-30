import { call, fork, take } from 'redux-saga/effects';
import { CREATE_NEW_RESUME, TEST_FETCH } from './Resume.store';
import { browserHistory } from 'react-router';

function* postCreateNewResume(data) {
  try {
    console.log('postCreateNewResume data = ', data);
    console.log(browserHistory);
    // yield call(browserHistory.push, '/resume/create');
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
