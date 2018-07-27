import { call, fork, take } from 'redux-saga/effects';
import { CREATE_NEW_RESUME, TEST_FETCH } from './Resume.store';

function* postCreateNewResume(api, data) {
  try {
    console.log('postCreateNewResume data = ', data);
  } catch (error) {
    console.log(error);
  }
}

export function* watchCreateNewResume(api) {
  while (true) {
    const { payload } = yield take(CREATE_NEW_RESUME);
    yield call(postCreateNewResume, api, payload['data']);
  }
}

export default function*({ api }) {
  yield fork(watchCreateNewResume, api);
}
