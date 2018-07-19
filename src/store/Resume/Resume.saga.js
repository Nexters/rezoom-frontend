import { call, fork, take } from 'redux-saga/effects';
import { TEST_FETCH } from './Resume.store';
import Resume from '../../service/Resume';

const api = Resume;

console.log('resume saga - ', api);

function* fetchTest() {
  console.log();
  try {
    const { data } = yield call(Resume.getTest, '');

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchTest(api) {
  while (true) {
    yield take(TEST_FETCH);
    yield call(fetchTest, api);
  }
}

export default function*() {
  yield fork(watchFetchTest);
}