import { resumeCreateFormData } from '../../utils/Constans';
import { FilterUtils } from '../../utils/FilterUtils';

export const UPDATE_RESUME_LIST = 'UPDATE_RESUME_LIST';
export const REQUEST_CREATE_NEW_RESUME = 'REQUEST_CREATE_NEW_RESUME';
export const RESPONSE_CREATE_NEW_RESUME = 'RESPONSE_CREATE_NEW_RESUME';
export const UPDATE_RESUME_DETAIL_CACHE = 'UPDATE_RESUME_DETAIL_CACHE';
export const SELECT_QUESTION_ID = 'SELECT_QUESTION_ID';

const initialState = {
  resumes: [
    {
      id: 1,
      title: '나의 첫번째 자소서',
      content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
    },
    {
      id: 2,
      title: '나의 두번째 자소서',
      content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
    },
    {
      id: 3,
      title: '나의 세번째 자소서',
      content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
    },
    {
      id: 4,
      title: '나의 네번째 자소서',
      content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
    },
    {
      id: 5,
      title: '나의 다섯번째 자소서',
      content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
    },
  ],
  createResumeCache: {
    info: {},
    detail: [],
    selectedQuestion: 1,
    prevQuestionId: 1,
  },
  test: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_RESUME_LIST:
      console.log(action.payload.resume);
      return {
        ...state,
        resumes: [...state.resumes, ...[action.payload.resume]],
      };
    case RESPONSE_CREATE_NEW_RESUME:
      // console.log(action.payload.data);
      const { year, sub, department, q1, q2, q3 } = resumeCreateFormData;

      let infoData = {};

      infoData.id = action.payload.data['id'];
      infoData.companyName = action.payload.data['companyName'];
      infoData.year = FilterUtils.getItem(year, action.payload.data['year']);
      infoData.sub = FilterUtils.getItem(sub, action.payload.data['sub']);
      infoData.department = FilterUtils.getItem(
        department,
        action.payload.data['department'],
      );
      infoData.q1 = FilterUtils.getItem(q1, action.payload.data['q1']);
      infoData.q2 = FilterUtils.getItem(q2, action.payload.data['q2']);
      infoData.q3 = FilterUtils.getItem(q3, action.payload.data['q3']);

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
    default:
      return state;
  }
}

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

export const selectedQuestion = id => ({
  type: SELECT_QUESTION_ID,
  payload: {
    id,
  },
});
