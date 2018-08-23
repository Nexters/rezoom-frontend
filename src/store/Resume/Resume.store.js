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
export const UPDATE_RESUME_DETAIL_ORIGIN = 'UPDATE_RESUME_DETAIL_ORIGIN';
export const UPDATE_RESUME_DETAIL_ORIGIN_REALTIME =
  'UPDATE_RESUME_DETAIL_ORIGIN_REALTIME';

export const GET_QUESTION_LIST = 'GET_QUESTION_LIST';
export const UPDATE_QUESTION_LIST = 'UPDATE_QUESTION_LIST';
export const SELECT_QUESTION_ID = 'SELECT_QUESTION_ID';
export const SELECT_CREATE_CACHE_QUESTION_ID =
  'SELECT_CREATE_CACHE_QUESTION_ID';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_ORIGIN = 'CREATE_QUESTION_ORIGIN';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_CACHE = 'DELETE_QUESTION_CACHE';
export const CLEAR_QUESTION = 'CLEAR_QUESTION';
export const REQUEST_CREATE_QUESTION = 'REQUEST_CREATE_QUESTION';
export const RESPONSE_CREATE_QUESTION = 'RESPONSE_CREATE_QUESTION';
export const REQUEST_UPDATE_QUESTION = 'REQUEST_UPDATE_QUESTION';

export const EDIT_RESUME_INFO_DATA = 'EDIT_RESUME_INFO_DATA';
export const DELETE_RESUME = 'DELETE_RESUME';

export const CLEAR_QUESTION_UPDATE_FLAG = 'CLEAR_QUESTION_UPDATE_FLAG';
export const CLEAR_QUESTION_CACHE = 'CLEAR_QUESTION_CACHE';

export const IS_UPDATE_MODE_CHANGE = 'IS_UPDATE_MODE_CHANGE';

const initialState = {
  resumes: [],
  questions: [],
  questionsUpdateFlag: false,
  isUpdateMode: false,
  selectedQuestion: 1,
  createResumeCache: {
    info: {
      companyName: '',
      applicationYear: 2018,
      halfType: '상반기',
      jobType: '',
      applicationType: 1,
      finishFlag: 1,
      passFlag: 2,
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
export const getUpdateQuestions = state => state.resume.questions;
export const getQuestionsUpdateFlag = state => state.resume.questionsUpdateFlag;

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
    case UPDATE_RESUME_DETAIL_ORIGIN:
      if (action.payload.data.value === undefined) {
        return;
      }
      let questions = Object.assign([], state.questions);
      let checkQuestion = false;
      let updateFlag = false;

      questions.forEach((item, itemIdx) => {
        if (item.questionId === action.payload.data.id) {
          checkQuestion = true;
          item.content = action.payload.data.value.content;
          item.title = action.payload.data.value.title;
          item.hashTags = action.payload.data.value.hashTags || [];
        }
      });

      if (questions.length === 0) {
        checkQuestion = true;
        updateFlag = true;
        questions.push(action.payload.data.value);
        quistions[0].questionId = action.payload.data.id;
      }

      if (state.questionsUpdateFlag) {
        updateFlag = true;
      }

      if (checkQuestion) {
        return {
          ...state,
          questions: questions,
          questionsUpdateFlag: updateFlag,
        };
      } else {
        return {
          ...state,
        };
      }
    case UPDATE_RESUME_DETAIL_ORIGIN_REALTIME:
      if (action.payload.data.value === undefined) {
        return;
      }

      let realtimeQuestions = Object.assign([], state.questions);
      let realtimeCheckQuestion = false;
      let updateFlagRealtime = false;

      realtimeQuestions.forEach((item, itemIdx) => {
        if (item.questionId === action.payload.data.id) {
          realtimeCheckQuestion = true;
          item.content = action.payload.data.value.content;
          item.title = action.payload.data.value.title;
          item.hashTags = action.payload.data.value.hashTags || [];
        }
      });

      if (realtimeQuestions.length === 0) {
        realtimeCheckQuestion = true;
        updateFlagRealtime = true;
        realtimeQuestions.push(action.payload.data.value);
        realtimeQuestions[0].questionId = action.payload.data.id;
      }

      if (state.questionsUpdateFlag) {
        updateFlagRealtime = true;
      }

      if (realtimeCheckQuestion) {
        return {
          ...state,
          questions: realtimeQuestions,
          questionsUpdateFlag: updateFlagRealtime,
        };
      } else {
        return {
          ...state,
        };
      }
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          item => item.questionId !== action.payload.questionId,
        ),
      };
    case DELETE_QUESTION_CACHE:
      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          detail: state.createResumeCache.detail.filter(
            item => item.questionId !== action.payload.questionId,
          ),
        },
      };
    case SELECT_QUESTION_ID:
      return {
        ...state,
        selectedQuestion: action.payload.id,
      };
    case SELECT_CREATE_CACHE_QUESTION_ID:
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
    case CREATE_QUESTION_ORIGIN:
      let newId = state.questions.length + 1;
      String(newId).padStart(10, '0');

      const newQuestion = {
        content: '',
        hashTags: [],
        questionId: state.questions.length === 0 ? 1 : Number(newId),
        title: '',
        type: 'new',
      };

      const mergeQuestion = Object.assign([], state.questions);
      mergeQuestion.push(newQuestion);
      return {
        ...state,
        questions: mergeQuestion,
        selectedQuestion: state.questions.length === 0 ? 1 : Number(newId),
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
    case CLEAR_QUESTION_UPDATE_FLAG:
      return {
        ...state,
        questionsUpdateFlag: false,
      };
    case IS_UPDATE_MODE_CHANGE:
      return {
        ...state,
        isUpdateMode: action.payload.isUpdate,
      };
    case CLEAR_QUESTION_CACHE:
      return {
        ...state,
        createResumeCache: {
          ...state.createResumeCache,
          detail: [],
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

export const updateResumeDetailOrigin = data => ({
  type: UPDATE_RESUME_DETAIL_ORIGIN,
  payload: {
    data,
  },
});

export const updateResumeDetailOriginRealtime = data => ({
  type: UPDATE_RESUME_DETAIL_ORIGIN_REALTIME,
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

export const createQuestionOrigin = () => ({
  type: CREATE_QUESTION_ORIGIN,
});

export const deleteQuestion = questionId => ({
  type: DELETE_QUESTION,
  payload: {
    questionId,
  },
});

export const deleteQuestionCache = questionId => ({
  type: DELETE_QUESTION_CACHE,
  payload: {
    questionId,
  },
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

export const requestUpdateQuestion = resumeId => ({
  type: REQUEST_UPDATE_QUESTION,
  payload: {
    resumeId,
  },
});

export const clearQuestionUpdateFlag = () => ({
  type: CLEAR_QUESTION_UPDATE_FLAG,
});

export const isUpdateModeChange = isUpdate => ({
  type: IS_UPDATE_MODE_CHANGE,
  payload: {
    isUpdate,
  },
});

export const clearQuestionCache = () => ({
  type: CLEAR_QUESTION_CACHE,
});
