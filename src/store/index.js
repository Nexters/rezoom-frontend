import configureStore from './configure';
import Api from '../service';

const initialState = window.__INITIAL_STATE__;

export default configureStore(initialState, { api: Api });
