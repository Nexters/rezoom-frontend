import { push, match } from 'connected-react-router';
import { call, fork, take, put, select } from 'redux-saga/effects';
import {
  GET_DEADLINE,
  updateDeadlineList,
  GET_RESUME_STATISTICS,
  updateResumeStatisticsList,
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
    console.log(error);
    throw error;
  }
}

function* getResumeStatistics() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getResumeStatistics);

    if (result) {
      console.log(result);
      yield put(updateResumeStatisticsList(result.data));
    }
    yield put(inactiveLoadingContainer());
  } catch (error) {
    console.log(error);
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

export default function*() {
  yield fork(watchDeadline);
  yield fork(watchResumeStatistics);
}
