// https://github.com/diegohaz/arc/wiki/Reducers
import camelCase from 'lodash/camelCase'
import { combineReducers } from 'redux'
// import { reducer as form } from 'redux-form'
// import { routerReducer as router } from 'react-router-redux'
const reducers = {
  // form,
  // router
}

const req = require.context('.', true, /\.\/.+\/\w+\.+store\.js$/)

req.keys().forEach((key) => {
  const storeName = camelCase(key.replace(/\.\/.+\/(\w+)\.+store\.js$/, '$1'))
  reducers[storeName] = req(key).default
})

export default combineReducers(reducers)
