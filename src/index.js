import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';
import './styles/main.scss';
import stores from './store';

const renderRoot = () => (
  <HotContainer>
    <Root store={stores.store} history={stores.history} />
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
