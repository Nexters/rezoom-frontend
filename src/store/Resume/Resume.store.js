import { resumeCreateFormData } from '../../utils/Constans';
import { FilterUtils } from '../../utils/FilterUtils';

export const GET_RESUME_LIST = 'GET_RESUME_LIST';
export const UPDATE_RESUME_LIST = 'UPDATE_RESUME_LIST';
export const REQUEST_CREATE_NEW_RESUME = 'REQUEST_CREATE_NEW_RESUME';
export const RESPONSE_CREATE_NEW_RESUME = 'RESPONSE_CREATE_NEW_RESUME';
export const UPDATE_RESUME_DETAIL_CACHE = 'UPDATE_RESUME_DETAIL_CACHE';

export const GET_QUESTION_LIST = 'GET_QUESTION_LIST';
export const UPDATE_QUESTION_LIST = 'UPDATE_QUESTION_LIST';
export const SELECT_QUESTION_ID = 'SELECT_QUESTION_ID';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';

const initialState = {
  resumes: [],
  questions: [],
  createResumeCache: {
    info: {},
    detail: [],
    selectedQuestion: 1,
    prevQuestionId: 1,
  },
  selectedResumeId: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_RESUME_LIST:
      return {
        ...state,
        resumes: action.payload.resume,
      };
    case UPDATE_QUESTION_LIST:
      return {
        ...state,
        questions: action.payload.questions,
      };
    case RESPONSE_CREATE_NEW_RESUME:
      // console.log(action.payload.data);
      const {
        applicationYear,
        halfType,
        jobType,
        applicationType,
        finishFlag,
        passFlag,
      } = resumeCreateFormData;

      let infoData = {};

      infoData.id = action.payload.data['id'];
      infoData.companyName = action.payload.data['companyName'];
      infoData.year = FilterUtils.getItem(
        applicationYear,
        action.payload.data['applicationYear'],
      );
      infoData.sub = FilterUtils.getItem(
        halfType,
        action.payload.data['halfType'],
      );
      infoData.jobType = FilterUtils.getItem(
        jobType,
        action.payload.data['jobType'],
      );
      infoData.q1 = FilterUtils.getItem(
        applicationType,
        action.payload.data['applicationType'],
      );
      infoData.q2 = FilterUtils.getItem(
        finishFlag,
        action.payload.data['finishFlag'],
      );
      infoData.q3 = FilterUtils.getItem(
        passFlag,
        action.payload.data['passFlag'],
      );

      // console.log(infoData);

      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          info: infoData,
        },
      };
    case UPDATE_RESUME_DETAIL_CACHE:
      console.log('UPDATE_RESUME_DETAIL_CACHE = ', action.payload.data);
      const idx = state.createResumeCache.selectedQuestion;
      const prevIdx = state.createResumeCache.prevQuestionId;
      let detail = Object.assign([], state.createResumeCache.detail);

      if (detail.length === 0 && prevIdx === 1) {
        detail.push(action.payload.data);
      } else {
        // TODO: detail에서 loop돌리면서 id가 있으면 update없으면 push
        const findItem = {};
        detail.forEach((item, itemIdx) => {
          if (item.id === idx) {
            findItem.item = item;
            findItem.itemIdx = itemIdx;
          }
        });
        if (findItem.item) {
          detail[findItem.itemIdx] = action.payload.data;
        } else {
          detail.push(action.payload.data);
        }
      }

      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          detail: detail,
        },
      };
    case SELECT_QUESTION_ID:
      const prevQuestionId = state.createResumeCache.selectedQuestion;

      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          selectedQuestion: action.payload.id,
          prevQuestionId: prevQuestionId,
        },
      };
    case CREATE_QUESTION:
      const newDetail = {
        content: '',
        hashTags: [],
        questionId:
          state.createResumeCache.detail.length === 0
            ? 1
            : state.createResumeCache.detail.length,
        title: '',
      };
      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          detail: state.createResumeCache.detail.push(newDetail),
          prevQuestionId: state.createResumeCache.selectedQuestion,
          selectedQuestion: state.createResumeCache.detail.length,
        },
      };
    default:
      return state;
  }
}

/*
 * Resume
 */
export const getResumeList = () => ({
  type: GET_RESUME_LIST,
});

export const updateResumeList = resume => ({
  type: UPDATE_RESUME_LIST,
  payload: {
    resume,
  },
});

export const createNewResume = data => ({
  type: REQUEST_CREATE_NEW_RESUME,
  payload: {
    data,
  },
});

export const responseCreateNewResume = data => ({
  type: RESPONSE_CREATE_NEW_RESUME,
  payload: {
    data,
  },
});

export const updateResumeDetailCache = data => ({
  type: UPDATE_RESUME_DETAIL_CACHE,
  payload: {
    data,
  },
});

/*
 * Question
 */
export const getQuestions = resumeId => ({
  type: GET_QUESTION_LIST,
  payload: {
    resumeId,
  },
});

export const updateQuestionList = questions => ({
  type: UPDATE_QUESTION_LIST,
  payload: {
    questions,
  },
});

export const selectedQuestion = id => ({
  type: SELECT_QUESTION_ID,
  payload: {
    id,
  },
});

export const createQuestion = () => ({
  type: CREATE_QUESTION,
});

export const deleteQuestion = () => ({
  type: DELETE_QUESTION,
});
