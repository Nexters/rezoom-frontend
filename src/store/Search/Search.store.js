export const SEARCH_RESUMES = 'SEARCH_RESUMES';
export const RESPONSE_SEARCH_RESUMES = 'RESPONSE_SEARCH_RESUMES';
export const RESPONSE_SEARCH_QUESTIONS_KEYWORD =
  'RESPONSE_SEARCH_QUESTIONS_KEYWORD';
export const RESPONSE_SEARCH_QUESTIONS_HASHTAG =
  'RESPONSE_SEARCH_QUESTIONS_HASHTAG';

const initialState = {
  searchResumes: [],
  searchQuestionsKeyword: [],
  searchQuestionsHashTag: [],
  mode: 'keyword',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESPONSE_SEARCH_RESUMES:
      return {
        ...state,
        searchResumes: action.payload.data,
      };
    case RESPONSE_SEARCH_QUESTIONS_KEYWORD:
      return {
        ...state,
        searchQuestionsKeyword: action.payload.data,
        mode: action.payload.mode,
      };
    case RESPONSE_SEARCH_QUESTIONS_HASHTAG:
      return {
        ...state,
        searchQuestionsHashTag: action.payload.data,
        mode: action.payload.mode,
      };
    default:
      return state;
  }
}

export const searchResumes = data => ({
  type: SEARCH_RESUMES,
  payload: {
    data,
  },
});

export const responseSearchResumes = data => ({
  type: RESPONSE_SEARCH_RESUMES,
  payload: {
    data,
  },
});

export const responseSearchQuestionsKeyword = (data, mode) => ({
  type: RESPONSE_SEARCH_QUESTIONS_KEYWORD,
  payload: {
    data,
    mode,
  },
});

export const responseSearchQuestionsHashTag = (data, mode) => ({
  type: RESPONSE_SEARCH_QUESTIONS_HASHTAG,
  payload: {
    data,
    mode,
  },
});
