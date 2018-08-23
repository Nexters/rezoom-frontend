import { push, match } from 'connected-react-router';
import { call, fork, take, put, select } from 'redux-saga/effects';
import {
  GET_DEADLINE,
  getDeadline,
  updateDeadlineList,
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
      console.log(result);
      yield put(updateDeadlineList(result.data));
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

export default function*() {
  yield fork(watchDeadline);
}
