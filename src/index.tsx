import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './components/Root';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import stores from './stores';

declare let module: any;

ReactDOM.render(
  <Provider store={stores}>
    <Root/>
  </Provider>,
  document.getElementById('root'));

// 以下を追加
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    ReactDOM.render(<Root />, document.getElementById('root'))
  })
}


// declare let module: any;

// if (module.hot) {
//   require('react-hot-loader/patch');
// }

// import { Provider } from 'mobx-react';
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import Root from './components/Root';
// import './index.scss';
// import registerServiceWorker from './registerServiceWorker';
// import stores from './stores';

// const renderApp = (app: any) => {
//   let result = (
//       <Provider store={stores}>
//           <Root/>
//       </Provider>
//   );
//   if (module.hot) {
//       result = <AppContainer>{result}</AppContainer>;
//   }
//   return result;
// };

// const target = document.getElementById('root') as HTMLElement;

// ReactDOM.render(renderApp(Root), target);

// if (module.hot) {
//   module.hot.accept('./components/Root', () => {
//       const NextApp = require('./components/Root').default;
//       ReactDOM.render(renderApp(NextApp), target);
//   });
// }

// // ReactDOM.render(
// //   <Provider {...stores}>
// //     <Root />
// //   </Provider>,
// //   document.getElementById('root') as HTMLElement
// // );

registerServiceWorker();

