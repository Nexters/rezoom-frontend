import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './Layout/Layout';
import Login from './Login/Login';
import PageNotFound from './Shared/Error/PageNotFound';

import { ConnectedRouter } from 'connected-react-router';

export class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Layout} />
            <Route exact path="/login" component={Login} />
            <Route path="/resume/:mode?/:id(.*)?" component={Layout} />
            <Route path="/files" component={Layout} />
            <Route path="/info" component={Layout} />
            <Route path="/search" component={Layout} />
            <Route component={PageNotFound} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};

export default Root;
