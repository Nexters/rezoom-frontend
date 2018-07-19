import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withLoading = () => WrappedComponent => {
  return class Loading extends Component {
    static propTypes = {};
    constructor(props) {
      super(props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoading;
