import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './Layout/Layout';
import Login from './Login/Login';
import PageNotFound from './Shared/Error/PageNotFound';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/resume/:id?" component={Layout} />
          <Route path="/files" component={Layout} />
          <Route path="/info" component={Layout} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object,
};

export default Root;
