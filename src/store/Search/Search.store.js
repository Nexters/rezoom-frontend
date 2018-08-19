export const SEARCH_RESUMES = 'SEARCH_RESUMES';
export const RESPONSE_SEARCH_RESUMES = 'RESPONSE_SEARCH_RESUMES';

const initialState = {
  searchResumes: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESPONSE_SEARCH_RESUMES:
      return {
        ...state,
        searchResumes: action.payload.data,
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
