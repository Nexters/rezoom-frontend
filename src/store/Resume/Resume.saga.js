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
  REQUEST_UPDATE_QUESTION,
  getUpdateQuestions,
  getQuestionsUpdateFlag,
  clearQuestionUpdateFlag,
  isUpdateModeChange,
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

    const resume = {
      companyName: data.companyName,
      applicationYear: data.applicationYear,
      applicationType: data.applicationType,
      finishFlag: data.finishFlag,
      halfType: data.halfType,
      jobType: data.jobType,
      passFlag: data.passFlag,
      deadline: data.deadline,
    };
    if (data.mode === 'Edit') {
      yield call(putUpdateResume, data.resumeId, resume);
    } else {
      console.log('new resume = ', data);
      const result = yield call(api.newResume, resume);
      // console.log('success new resume = ', result);

      if (result) {
        yield put(responseCreateNewResume(data));
      }

      yield put(dialogClose());
      yield put(push(`/resume/create/${result.data}`));
    }
    yield put(inactiveLoadingComponent());
    console.log('inactive');
  } catch (error) {
    console.log(error);
    throw error;
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
    throw error;
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
    throw error;
  }
}

function* postCreateQuestions(resumeId) {
  try {
    yield put(activeLoadingContainer());
    const originQuestions = yield select(getCreateQuestions);

    originQuestions.forEach(item => {
      delete item.questionId;
      if (item.hashTags instanceof Array) {
        item.hashTags = item.hashTags.join();
      }
    });

    const body = {
      questions: originQuestions,
      resumeId: Number(resumeId),
    };

    const result = yield call(api.insertQuestions, body);
    const payload = { resumeId: resumeId };

    if (result) {
      yield call(getQuestionsList, payload);
      yield put(push(`/resume/detail/${resumeId}`));
      yield put(inactiveLoadingContainer());
    }
  } catch (error) {
    console.log(error);
    throw error;
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
    throw error;
  }
}

function* deleteOneResume(resumeId) {
  try {
    yield put(activeLoadingComponent());

    const result = yield call(api.deleteResume, resumeId);

    if (result) {
      yield call(getResumeList);
    }
    yield put(inactiveLoadingComponent());
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function* putUpdateQuestion(resumeId) {
  try {
    yield put(activeLoadingComponent());

    const questionsUpdateFlag = yield select(getQuestionsUpdateFlag);
    const originQuestions = yield select(getUpdateQuestions);
    const payload = { resumeId: resumeId };

    originQuestions.forEach(item => {
      if (questionsUpdateFlag) {
        delete item.questionId;
      }
      if (item.hasOwnProperty('type')) {
        delete item.type;
        delete item.questionId;
      }
      if (item.hashTags instanceof Array) {
        item.hashTags = item.hashTags.join();
      }
    });

    const body = {
      questions: originQuestions,
      resumeId: Number(resumeId),
    };

    let result;

    if (questionsUpdateFlag) {
      result = yield call(api.insertQuestions, body);
    } else {
      result = yield call(api.updateQuestions, body);
    }

    if (result) {
      if (questionsUpdateFlag) {
        yield put(clearQuestionUpdateFlag());
        yield put(isUpdateModeChange(false));
      }
      yield call(getQuestionsList, payload);
      yield put(push(`/resume/detail/${resumeId}`));
      yield put(inactiveLoadingContainer());
    }
  } catch (error) {
    console.log(error);
    throw error;
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

export function* watchUpdateQuestion() {
  while (true) {
    const { payload } = yield take(REQUEST_UPDATE_QUESTION);
    yield call(putUpdateQuestion, payload.resumeId);
  }
}

export default function*() {
  yield fork(watchCreateNewResume);
  yield fork(watchCreateQuestions);
  yield fork(watchResumeList);
  yield fork(watchQuestionList);
  yield fork(watchDeleteResume);
  yield fork(watchUpdateQuestion);
}
