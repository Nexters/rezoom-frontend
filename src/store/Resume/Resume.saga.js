import { push } from 'connected-react-router';
import { call, fork, take, put, select } from 'redux-saga/effects';
import {
  REQUEST_CREATE_NEW_RESUME,
  responseCreateNewResume,
  GET_RESUME_LIST,
  updateResumeList,
  updateQuestionList,
  GET_QUESTION_LIST,
  REQUEST_CREATE_QUESTION,
  getSelectedQuestionId,
  getCreateQuestions,
} from './Resume.store';
import api from '../../service';
import {
  activeLoadingContainer,
  inactiveLoadingContainer,
} from '../Loader/Loader.store';

function* postCreateNewResume(data) {
  try {
    const result = yield call(api.newResume, data);
    console.log('success new data = ', data);
    console.log('success new resume = ', result);

    yield put(responseCreateNewResume(data));
    yield put(push(`/resume/create/${result.data}`));
  } catch (error) {
    console.log(error);
  }
}

function* getResumeList() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getResumes);

    if (result) {
      yield put(updateResumeList(result.data));
    }
    yield put(inactiveLoadingContainer());
  } catch (error) {
    console.log(error);
  }
}

function* getQuestionsList(payload) {
  try {
    const resumeId = payload.resumeId;
    const result = yield call(api.getQuestions, resumeId);

    if (result) {
      yield put(updateQuestionList(result.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* postCreateQuestions(resumeId) {
  try {
    const originQuestions = yield select(getCreateQuestions);

    originQuestions.forEach(item => {
      delete item.questionId;
      item.hashTags = item.hashTags.join();
    });

    const body = {
      questions: originQuestions,
      resumeId: Number(resumeId),
    };

    const result = yield call(api.insertQuestions, body);

    if (result) {
      console.log('success insert questions = ', result);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchResumeList() {
  while (true) {
    yield take(GET_RESUME_LIST);
    yield call(getResumeList);
  }
}

export function* watchQuestionList() {
  while (true) {
    const { payload } = yield take(GET_QUESTION_LIST);
    yield call(getQuestionsList, payload);
  }
}

export function* watchCreateNewResume() {
  while (true) {
    const { payload } = yield take(REQUEST_CREATE_NEW_RESUME);
    yield call(postCreateNewResume, payload['data']);
  }
}

export function* watchCreateQuestions() {
  while (true) {
    const { payload } = yield take(REQUEST_CREATE_QUESTION);
    yield call(postCreateQuestions, payload['resumeId']);
  }
}

export default function*() {
  yield fork(watchCreateNewResume);
  yield fork(watchCreateQuestions);
  yield fork(watchResumeList);
  yield fork(watchQuestionList);
}
