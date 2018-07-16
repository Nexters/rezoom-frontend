import { createStore, applyMiddleware, compose } from 'redux';
import createsagaMiddleware, { END } from 'redux-saga';
import sagas from './sagas';
import reducers from './reducers';

const isDev = process.env.NODE_ENV === 'development' || true;

const devtools =
  isDev && window.devToolsExtension ? window.devToolsExtension : () => fn => fn;

const configureStore = (initialState, services = {}) => {
  const sagaMiddleware = createsagaMiddleware({
    onError: err => {
      setImmediate(() => {
        console.log(err);
      });
    },
  });

  const enhancers = [
    applyMiddleware(sagaMiddleware),
    devtools({
      actionsBlacklist: ['trade/UPDATE_TICKER'],
      maxAge: 1000,
    }),
  ];

  const store = createStore(reducers, initialState, compose(...enhancers));

  let sagaTask = sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas, services);
      });
    });
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};

export default configureStore;
