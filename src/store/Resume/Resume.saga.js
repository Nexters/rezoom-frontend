import { push, match } from 'connected-react-router';
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
  UPDATE_RESUME,
  DELETE_RESUME,
} from './Resume.store';
import api from '../../service';
import {
  activeLoadingContainer,
  inactiveLoadingContainer,
  activeLoadingComponent,
  inactiveLoadingComponent,
} from '../Loader/Loader.store';
import { FilterUtils } from '../../utils/FilterUtils';
import { resumeCreateFormData } from '../../utils/Constans';
import { dialogClose } from '../Dialog/Dialog.store';

function* postCreateNewResume(data) {
  try {
    yield put(activeLoadingComponent());

    if (data.mode === 'Edit') {
      const resume = {
        companyName: data.companyName,
        applicationYear: data.applicationYear,
        halfType: data.halfType,
        jobType: data.jobType,
        applicationType: data.applicationType,
        finishFlag: data.finishFlag,
        passFlag: data.passFlag,
      };
      yield call(putUpdateResume, data.resumeId, resume);
    } else {
      const param = {
        applicationType: data.applicationType,
        applicationYear: data.applicationYear,
        companyName: data.companyName,
        finishFlag: data.finishFlag,
        halfType: data.halfType,
        jobType: data.jobType,
        passFlag: data.passFlag,
      };
      console.log('param = ', param);
      const result = yield call(api.newResume, param);
      console.log('success new resume = ', result);

      if (result) {
        yield put(responseCreateNewResume(data));
      }

      yield put(dialogClose());
      yield put(push(`/resume/create/${result.data}`));
    }
    yield put(inactiveLoadingComponent());
  } catch (error) {
    console.log(error);
  }
}

function* getResumeList() {
  try {
    yield put(activeLoadingContainer());
    const result = yield call(api.getResumes);

    if (result) {
      result.data.forEach(item => {
        if (item.applicationType.length === 1) {
          item.applicationType = FilterUtils.filterItem(
            resumeCreateFormData.applicationType,
            String(item.applicationType),
          );
        }

        item.finishFlag = FilterUtils.filterItem(
          resumeCreateFormData.finishFlag,
          item.finishFlag,
        );
      });
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

function* putUpdateResume(resumeId, resume) {
  try {
    const body = {
      resume: resume,
    };

    const result = yield call(api.updateResume, resumeId, body);

    if (result) {
      console.log('success insert questions = ', result);
    }
    yield put(inactiveLoadingComponent());
    yield put(dialogClose());
  } catch (error) {
    console.log(error);
  }
}

function* deleteOneResume(resumeId) {
  try {
    yield put(activeLoadingComponent());

    const result = yield call(api.deleteResume, resumeId);

    if (result) {
      yield call(getResumeList);
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

export function* watchDeleteResume() {
  while (true) {
    const { payload } = yield take(DELETE_RESUME);
    yield call(deleteOneResume, payload.resumeId);
  }
}

export default function*() {
  yield fork(watchCreateNewResume);
  yield fork(watchCreateQuestions);
  yield fork(watchResumeList);
  yield fork(watchQuestionList);
  yield fork(watchDeleteResume);
}
