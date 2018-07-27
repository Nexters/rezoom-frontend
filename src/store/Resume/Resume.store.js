export const UPDATE_RESUME_LIST = 'UPDATE_RESUME_LIST';
export const CREATE_NEW_RESUME = 'CREATE_NEW_RESUME';

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
  type: CREATE_NEW_RESUME,
  payload: {
    data,
  },
});
