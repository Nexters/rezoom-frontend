import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  Component: propTypes.object,
  location: PropTypes.object,
};

export default PrivateRouteContainer;
