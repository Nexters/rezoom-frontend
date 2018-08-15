import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configure';
import sagas from './store/sagas';
import Root from './components/Root';
import './static/styles/main.scss';

const initialState = window.__INITIAL_STATE__;
const history = createBrowserHistory();

const store = configureStore(initialState, history);

const renderRoot = () => (
  <HotContainer>
    <Root store={store} history={history} />
  </HotContainer>
);

const rootEl = document.getElementById('root');

rootEl.style.position = 'absolute';
rootEl.style.top = 0;
rootEl.style.bottom = 0;
rootEl.style.left = 0;
rootEl.style.right = 0;
rootEl.style.overflow = 'hidden';

render(renderRoot(), rootEl);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    require('./components/Root');
    render(renderRoot(), rootEl);
  });
}

registerServiceWorker();
