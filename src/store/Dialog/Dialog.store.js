export const DIALOG_OPEN = 'DIALOG_OPEN';
export const DIALOG_CLOSE = 'DIALOG_CLOSE';

const initialState = {
  dialog: {
    name: '',
    isOpen: false,
    mode: 'Create',
    id: 0,
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DIALOG_OPEN:
      let name;
      if (action.payload.type === '/resume') {
        name = 'Create';
      } else if (action.payload.type === '/files') {
        name = 'Files';
      }
      return {
        ...state,
        dialog: {
          name: name,
          isOpen: true,
          mode: action.payload.mode,
          id: action.payload.id,
        },
      };
    case DIALOG_CLOSE:
      return {
        ...state,
        dialog: {
          name: '',
          isOpen: false,
        },
      };
    default:
      return state;
  }
}

export const dialogOpen = (type, mode, id) => ({
  type: DIALOG_OPEN,
  payload: {
    type,
    mode,
    id,
  },
});

export const dialogClose = type => ({
  type: DIALOG_CLOSE,
  payload: {
    type,
  },
});
