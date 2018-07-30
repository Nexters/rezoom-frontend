import camelCase from 'lodash/camelCase';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  form: formReducer,
};

const req = require.context('.', true, /\.\/.+\/\w+\.+store\.js$/);

req.keys().forEach(key => {
  const storeName = camelCase(key.replace(/\.\/.+\/(\w+)\.+store\.js$/, '$1'));
  reducers[storeName] = req(key).default;
});

export default combineReducers(reducers);
