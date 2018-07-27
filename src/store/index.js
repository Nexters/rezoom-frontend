import configureStore from './configure';
import api from '../service';
import sagas from './sagas';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, { api: api });

store.runSaga(sagas, { api: api });

export default store;
