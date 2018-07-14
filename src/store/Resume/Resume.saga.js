import { call, fork, take } from 'redux-saga/effects';
import { TEST_FETCH } from './Resume.store';

function* fetchTest(api) {
  try {
    const { data } = yield call(api.Resume.fetchTest);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchTest(api) {
  while (true) {
    const { payload } = yield take(TEST_FETCH);
    yield call(fetchTest, api);
  }
}

export default function*() {
  yield fork(watchFetchTest);
}
