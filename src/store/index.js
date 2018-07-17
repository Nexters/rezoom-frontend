import configureStore from './configure';
import Api from '../service/Api';
import sagas from './sagas';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, { api: Api });

store.runSaga(sagas, { api: Api });

export default store;
