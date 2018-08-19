import { call, fork, take, put } from 'redux-saga/effects';
import api from '../../service';
import { SEARCH_RESUMES, responseSearchResumes } from './Search.store';
import { push } from 'connected-react-router';
import {
  activeLoadingContainer,
  inactiveLoadingContainer,
} from '../Loader/Loader.store';
import { resumeCreateFormData } from '../../utils/Constans';
import { FilterUtils } from '../../utils/FilterUtils';

export function* getSearchResumes(data) {
  try {
    yield put(activeLoadingContainer());

    const result = yield call(api.getSearchResumes, data.companyName);

    if (result.data) {
      result.data.forEach(item => {
        if (item.applicationType.length === 1) {
          item.applicationType = FilterUtils.filterItem(
            resumeCreateFormData.applicationType,
            String(item.applicationType),
          );
        }

        if (item.halfType.length === 1) {
          item.halfType = FilterUtils.filterItem(
            resumeCreateFormData.halfType,
            Number(item.halfType),
          );
        }

        item.finishFlag = FilterUtils.filterItem(
          resumeCreateFormData.finishFlag,
          item.finishFlag,
        );
      });
      yield put(responseSearchResumes(result.data));
    }
    yield put(push(`/search/resumes`));
    yield put(inactiveLoadingContainer());
  } catch (e) {
    throw e;
  }
}

export function* watchSearchResumes() {
  while (true) {
    const { payload } = yield take(SEARCH_RESUMES);
    yield call(getSearchResumes, payload.data);
  }
}

export default function*() {
  yield fork(watchSearchResumes);
}
