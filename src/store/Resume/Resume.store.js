export const UPDATE_RESUME_LIST = 'UPDATE_RESUME_LIST';

const initialState = {
  resumes: [
    { id: 0, name: '테스트1', contents: 'hahahah hohoho' },
    { id: 1, name: '테스트2', contents: 'heheheh hihihi' },
  ],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_RESUME_LIST:
      console.log(action.payload.resume);
      return {
        ...state,
        resumes: [...state.resumes, ...[action.payload.resume]],
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
