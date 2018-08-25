import { push, match } from 'connected-react-router';
import { call, fork, take, put, select } from 'redux-saga/effects';
import {
  GET_DEADLINE,
  GET_RESUME_STATISTICS,
  GET_RECENT_CLICK,
  GET_HASHTAG,
  GET_NAME,
  updateDeadlineList,
  updateResumeStatisticsList,
  updateRecentClickList,
  updateHashtagList,
  updateName,
} from './Dashboard.store';
import api from '../../service';
import {
  activeLoadingContainer,
  inactiveLoadingContainer,
  activeLoadingComponent,
  inactiveLoadingComponent,
} from '../Loader/Loader.store';

function* getDeadlineList() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getDeadline);

    if (result) {
      yield put(updateDeadlineList(result.data));
    }
    yield put(inactiveLoadingContainer());
  } catch (error) {
    throw error;
  }
}

function* getResumeStatistics() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getResumeStatistics);

    if (result) {
      yield put(updateResumeStatisticsList(result.data));
    }
    yield put(inactiveLoadingContainer());
  } catch (error) {
    throw error;
  }
}

function* getRecentClick() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getRecentClick);

    if (result) {
      yield put(updateRecentClickList(result.data));
    }
    yield put(inactiveLoadingContainer());
  } catch (error) {
    throw error;
  }
}

function* getHashtag() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getHashtag);

    if (result) {
      yield put(updateHashtagList(result.data));
    }
    yield put(inactiveLoadingContainer());
  } catch (error) {
    throw error;
  }
}

function* getName() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getName);

    if (result) {
      yield put(updateName(result.data));
    }
    yield put(inactiveLoadingContainer());
  } catch (error) {
    throw error;
  }
}

export function* watchDeadline() {
  while (true) {
    yield take(GET_DEADLINE);
    yield call(getDeadlineList);
  }
}

export function* watchResumeStatistics() {
  while (true) {
    yield take(GET_RESUME_STATISTICS);
    yield call(getResumeStatistics);
  }
}

export function* watchRecentClick() {
  while (true) {
    yield take(GET_RECENT_CLICK);
    yield call(getRecentClick);
  }
}

export function* watchHashtag() {
  while (true) {
    yield take(GET_HASHTAG);
    yield call(getHashtag);
  }
}

export function* watchName() {
  while (true) {
    yield take(GET_NAME);
    yield call(getName);
  }
}

export default function*() {
  yield fork(watchDeadline);
  yield fork(watchResumeStatistics);
  yield fork(watchRecentClick);
  yield fork(watchHashtag);
  yield fork(watchName);
}
