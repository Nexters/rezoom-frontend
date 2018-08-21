import { resumeCreateFormData } from '../../utils/Constans';
import { FilterUtils } from '../../utils/FilterUtils';
import moment from 'moment';

export const GET_RESUME_LIST = 'GET_RESUME_LIST';
export const UPDATE_RESUME_LIST = 'UPDATE_RESUME_LIST';
export const REQUEST_CREATE_NEW_RESUME = 'REQUEST_CREATE_NEW_RESUME';
export const RESPONSE_CREATE_NEW_RESUME = 'RESPONSE_CREATE_NEW_RESUME';
export const UPDATE_RESUME_DETAIL_CACHE = 'UPDATE_RESUME_DETAIL_CACHE';
export const UPDATE_RESUME_DETAIL_CACHE_REALTIME =
  'UPDATE_RESUME_DETAIL_CACHE_REALTIME';

export const GET_QUESTION_LIST = 'GET_QUESTION_LIST';
export const UPDATE_QUESTION_LIST = 'UPDATE_QUESTION_LIST';
export const SELECT_QUESTION_ID = 'SELECT_QUESTION_ID';
export const SELECT_CREATE_CACHE_QUESTION_ID =
  'SELECT_CREATE_CACHE_QUESTION_ID';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const CLEAR_QUESTION = 'CLEAR_QUESTION';
export const REQUEST_CREATE_QUESTION = 'REQUEST_CREATE_QUESTION';
export const RESPONSE_CREATE_QUESTION = 'RESPONSE_CREATE_QUESTION';

export const EDIT_RESUME_INFO_DATA = 'EDIT_RESUME_INFO_DATA';
export const DELETE_RESUME = 'DELETE_RESUME';

const initialState = {
  resumes: [],
  questions: [],
  selectedQuestion: 1,
  createResumeCache: {
    info: {
      companyName: '',
      applicationYear: 2018,
      halfType: '상반기',
      jobType: '',
      applicationType: 1,
      finishFlag: 1,
      passFlag: 1,
      deadline: moment().format('YYYY-MM-DD HH'),
    },
    detail: [],
    thisId: 1,
    prevId: 1,
    mode: 'select',
  },
};

export const getCreateQuestions = state =>
  state.resume.createResumeCache.detail;
export const getSelectedQuestionId = state => state.resume.selectedQuestion;

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
      const { applicationType, finishFlag, passFlag } = resumeCreateFormData;

      let infoData = {};

      infoData.id = action.payload.data['id'];
      infoData.companyName = action.payload.data['companyName'];
      infoData.applicationYear = action.payload.data['applicationYear'];
      infoData.halfType = action.payload.data['halfType'];
      infoData.jobType = action.payload.data['jobType'];
      infoData.applicationType = FilterUtils.getItem(
        applicationType,
        action.payload.data['applicationType'],
      );
      infoData.finishFlag = FilterUtils.getItem(
        finishFlag,
        action.payload.data['finishFlag'],
      );
      infoData.passFlag = FilterUtils.getItem(
        passFlag,
        action.payload.data['passFlag'],
      );
      infoData.deadline = action.payload.data['deadline'];

      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          info: infoData,
        },
      };
    case UPDATE_RESUME_DETAIL_CACHE:
      if (action.payload.data.value === undefined) {
        return;
      }
      const thisId = state.createResumeCache.thisId;
      const prevId = state.createResumeCache.prevId;
      let detail = Object.assign([], state.createResumeCache.detail);
      let itemCheck = false;
      detail.forEach((item, itemIdx) => {
        if (item.questionId === prevId) {
          itemCheck = true;
          item.content = action.payload.data.value.content;
          item.title = action.payload.data.value.title;
          item.hashTags = action.payload.data.value.hashTags || [];
        }
      });
      if (itemCheck) {
        return {
          ...state,
          createResumeCache: {
            ...state.createResumeCache,
            detail: detail,
            mode: 'select',
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case UPDATE_RESUME_DETAIL_CACHE_REALTIME:
      if (action.payload.data.value === undefined) {
        return;
      }

      let detailOrg = Object.assign([], state.createResumeCache.detail);
      let orgCheck = false;
      detailOrg.forEach((item, itemIdx) => {
        if (item.questionId === action.payload.data.id) {
          itemCheck = true;
          item.content = action.payload.data.value.content;
          item.title = action.payload.data.value.title;
          item.hashTags = action.payload.data.value.hashTags || [];
        }
      });

      console.log(detailOrg);
      console.log('itemCheck = ', orgCheck);
      if (orgCheck) {
        return {
          ...state,
          createResumeCache: {
            ...state.createResumeCache,
            detail: detailOrg,
            mode: 'select',
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case SELECT_QUESTION_ID:
      return {
        ...state,
        selectedQuestion: action.payload.id,
      };
    case SELECT_CREATE_CACHE_QUESTION_ID:
      console.log(action.payload);
      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          prevId: action.payload.prevId,
          thisId: action.payload.id,
          mode: action.payload.selMode,
        },
      };
    case CREATE_QUESTION:
      const newDetail = {
        content: '',
        hashTags: [],
        questionId:
          state.createResumeCache.detail.length === 0
            ? 1
            : state.createResumeCache.detail.length + 1,
        title: '',
      };
      const mergeDetail = Object.assign([], state.createResumeCache.detail);
      mergeDetail.push(newDetail);
      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          detail: mergeDetail,
          prevId: state.createResumeCache.thisId,
          thisId: state.createResumeCache.detail.length + 1,
          mode: 'add',
        },
      };
    case CLEAR_QUESTION:
      return {
        ...state,
        questions: [],
        selectedQuestion: 1,
      };
    case EDIT_RESUME_INFO_DATA:
      console.log('resumeId = ', action.payload.resumeId);
      console.log('resumes = ', state.resumes);
      const resumeInfo = state.resumes.filter(
        item => item.resumeId === Number(action.payload.resumeId),
      );
      console.log(resumeInfo);
      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          info: resumeInfo[0],
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

export const updateResumeDetailCacheRealtime = data => ({
  type: UPDATE_RESUME_DETAIL_CACHE_REALTIME,
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

export const selectedCreateCacheQuestion = (prevId, id, selMode) => ({
  type: SELECT_CREATE_CACHE_QUESTION_ID,
  payload: {
    prevId,
    id,
    selMode,
  },
});

export const createQuestion = () => ({
  type: CREATE_QUESTION,
});

export const deleteQuestion = () => ({
  type: DELETE_QUESTION,
});

export const clearQuestion = () => ({
  type: CLEAR_QUESTION,
});

export const requestCreateQuestion = resumeId => ({
  type: REQUEST_CREATE_QUESTION,
  payload: {
    resumeId,
  },
});

export const responseCreateQuestion = () => ({
  type: RESPONSE_CREATE_QUESTION,
});

export const editResumeInfoData = resumeId => ({
  type: EDIT_RESUME_INFO_DATA,
  payload: {
    resumeId,
  },
});

export const deleteResume = resumeId => ({
  type: DELETE_RESUME,
  payload: {
    resumeId,
  },
});
