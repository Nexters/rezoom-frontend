import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const withAuthGuard = isLogin => WrappedComponent => {
  return class AuthGuard extends Component {
    static propTypes = {
      isLogin: PropTypes.bool,
      match: PropTypes.object,
    };
    constructor(props) {
      super(props);
    }

    render() {
      const validJwt = Cookies.get('jwt');
      return validJwt !== undefined ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect push to="/login" />
      );
    }
  };
};

export default withAuthGuard;
