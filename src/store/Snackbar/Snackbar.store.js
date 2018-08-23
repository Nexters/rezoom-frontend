export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

const initialState = {
  open: false,
  data: {
    variant: 'success',
    message: '',
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
        data: {
          variant: action.payload.data.variant,
          message: action.payload.data.message,
        },
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
        data: {
          variant: 'success',
          message: '',
        },
      };
    default:
      return state;
  }
}

export const openSnackbar = data => ({
  type: OPEN_SNACKBAR,
  payload: { data },
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});
