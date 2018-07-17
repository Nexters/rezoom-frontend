import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const withAuthGuard = isLogin => WrappedComponent => {
  return class AuthGuard extends Component {
    static propTypes = {
      isLogin: PropTypes.bool,
    };
    constructor(props) {
      super(props);
    }

    render() {
      return this.props.isLogin ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect push to="/login" />
      );
    }
  };
};

export default withAuthGuard;
