import { call, fork, take, put } from 'redux-saga/effects';
import api from '../../service';
import {
  SEARCH_RESUMES,
  responseSearchResumes,
  responseSearchQuestionsKeyword,
  responseSearchQuestionsHashTag,
} from './Search.store';
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

    if (data.mode === 'questions') {
      let result;

      if (data.questionSearchOption === 'keyword') {
        result = yield call(api.getQuestionsKeyword, data.searchText);
        if (result.data) {
          yield put(responseSearchQuestionsKeyword(result.data, 'keyword'));
          yield put(push(`/search/questions`));
        }
      } else if (data.questionSearchOption === 'hashtag') {
        // TODO: hashtag 색칠하기
        result = yield call(api.getQuestionsHashTag, data.searchText);
        if (result.data) {
          yield put(responseSearchQuestionsHashTag(result.data, 'hashtag'));
          yield put(push(`/search/questions`));
        }
      }

      // [{"questionId":108,"title":"삼성에 지원한 동기 및 포부는?","content":"돈 많이 벌려고 지원했습니다.","companyName":"네이","hashTags":["지원동기","포부"]},{"questionId":151,"title":"삼성에 지원한 동기 및 포부는?","content":"돈 많이 벌려고 지원했습니다.","companyName":"네이","hashTags":["asdasd","asda","asd","asdasdas"]}]
    } else if (data.mode === 'resumes') {
      const result = yield call(api.getSearchResumes, data.searchText);

      if (result.data) {
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
        yield put(responseSearchResumes(result.data));
      }
      yield put(push(`/search/resumes`));
    }

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
