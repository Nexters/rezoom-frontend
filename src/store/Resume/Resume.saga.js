import { push } from 'connected-react-router';
import { call, fork, take, put, select } from 'redux-saga/effects';
import {
  REQUEST_CREATE_NEW_RESUME,
  responseCreateNewResume,
  GET_RESUME_LIST,
  updateResumeList,
} from './Resume.store';
import api from '../../service';
import { getJwtToken } from '../Auth/Auth.store';

function* postCreateNewResume(data) {
  try {
    const result = yield call(api.newResume, data);
    console.log('success new resume = ', result);

    yield put(responseCreateNewResume(data));
    yield put(push(`/resume/create/${result.data}`));
  } catch (error) {
    console.log(error);
  }
}

function* apiTest() {
  try {
    const token = yield select(getJwtToken);
    const result = yield call(api.getResume, token);

    if (result) {
      yield put(updateResumeList(result.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchApiTest() {
  while (true) {
    yield take(GET_RESUME_LIST);
    yield call(apiTest);
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
  yield fork(watchApiTest);
}
