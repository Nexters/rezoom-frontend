import { createBrowserHistory } from 'history';
import configureStore from './configure';
import api from '../service';
import sagas from './sagas';

const initialState = window.__INITIAL_STATE__;
const history = createBrowserHistory();

const store = configureStore(initialState, { api: api }, history);

store.runSaga(sagas, { api: api });

export const stores = {
  store,
  history,
};

export default stores;
