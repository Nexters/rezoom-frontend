export const GET_DEADLINE = 'GET_DEADLINE';
export const GET_RESUME_STATISTICS = 'GET_RESUME_STATISTICS';
export const GET_RECENT_CLICK = 'GET_RECENT_CLICK';
export const GET_HASHTAG = 'GET_HASHTAG';

export const UPDATE_DEALINE_LIST = 'UPDATE_DEALINE_LIST';
export const UPDATE_RESUME_STATISTICS_LIST = 'UPDATE_RESUME_STATISTICS_LIST';
export const UPDATE_RECENT_CLICK_LIST = 'UPDATE_RECENT_CLICK_LIST';
export const UPDATE_HASHTAG_LIST = 'UPDATE_HASHTAG_LIST';

const initialState = {
  deadline: [],
  resumeStatistics: {
    pass: {
      title: '',
      resumeNum: 0,
      ratio: 0,
    },
    nonPass: {
      title: '',
      resumeNum: 0,
      ratio: 0,
    },
    submit: {
      title: '',
      resumeNum: 0,
      ratio: 0,
    },
    nonSubmit: {
      title: '',
      resumeNum: 0,
      ratio: 0,
    },
  },
  recentClick: [],
  hashtag: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_DEALINE_LIST:
      return {
        ...state,
        deadline: action.payload.deadline,
      };
    case UPDATE_RESUME_STATISTICS_LIST:
      return {
        ...state,
        resumeStatistics: action.payload.resumeStatistics,
      };
    case UPDATE_RECENT_CLICK_LIST:
      return {
        ...state,
        recentClick: action.payload.recentClick,
      };
    case UPDATE_HASHTAG_LIST:
      return {
        ...state,
        hashtag: action.payload.hashtag,
      };
    default:
      return state;
  }
}

export const getDeadline = () => ({
  type: GET_DEADLINE,
});

export const getResumeStatistics = () => ({
  type: GET_RESUME_STATISTICS,
});

export const getRecentClick = () => ({
  type: GET_RECENT_CLICK,
});

export const getHashtag = () => ({
  type: GET_HASHTAG,
});

export const updateDeadlineList = deadline => ({
  type: UPDATE_DEALINE_LIST,
  payload: {
    deadline,
  },
});

export const updateResumeStatisticsList = resumeStatistics => ({
  type: UPDATE_RESUME_STATISTICS_LIST,
  payload: {
    resumeStatistics,
  },
});

export const updateRecentClickList = recentClick => ({
  type: UPDATE_RECENT_CLICK_LIST,
  payload: {
    recentClick,
  },
});

export const updateHashtagList = hashtag => ({
  type: UPDATE_HASHTAG_LIST,
  payload: {
    hashtag,
  },
});
