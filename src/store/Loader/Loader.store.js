export const ACTIVE_LOADING_CONTAINER = 'ACTIVE_LOADING_CONTAINER';
export const INACTIVE_LOADING_CONTAINER = 'INACTIVE_LOADING_CONTAINER';
export const ACTIVE_LOADING_COMPONENT = 'ACTIVE_LOADING_COMPONENT';
export const INACTIVE_LOADING_COMPONENT = 'INACTIVE_LOADING_COMPONENT';

const initialState = {
  container: true,
  component: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIVE_LOADING_CONTAINER:
      return {
        ...state,
        container: true,
      };
    case INACTIVE_LOADING_CONTAINER:
      return {
        ...state,
        container: false,
      };
    case ACTIVE_LOADING_COMPONENT:
      return {
        ...state,
        component: true,
      };
    case INACTIVE_LOADING_COMPONENT:
      console.log('inactive success');
      return {
        ...state,
        component: false,
      };
    default:
      return state;
  }
}

export const activeLoadingContainer = () => ({
  type: ACTIVE_LOADING_CONTAINER,
});

export const inactiveLoadingContainer = () => ({
  type: INACTIVE_LOADING_CONTAINER,
});

export const activeLoadingComponent = () => ({
  type: ACTIVE_LOADING_COMPONENT,
});

export const inactiveLoadingComponent = () => ({
  type: INACTIVE_LOADING_COMPONENT,
});
