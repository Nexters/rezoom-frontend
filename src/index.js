import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';
import './styles/main.scss';
import store from './store';

// window.axios = axios;

// if (process.env.NODE_ENV === 'production') {
//   axios.defaults.withCredentials = true;
//   axios.defaults.baseURL = 'https://localhost.com';
// }

const render = Component =>
  ReactDOM.render(
    <HotContainer>
      <Component store={store} />
    </HotContainer>,
    document.getElementById('root'),
  );

render(Root);

const rootEl = document.getElementById('root');

rootEl.style.position = 'absolute';
rootEl.style.top = 0;
rootEl.style.bottom = 0;
rootEl.style.left = 0;
rootEl.style.right = 0;
rootEl.style.overflow = 'hidden';

if (module.hot) {
  module.hot.accept('./components/Root', () => render(Root));
}

registerServiceWorker();
