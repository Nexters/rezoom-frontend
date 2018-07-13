import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class LayoutContainer extends Component {
  render() {
    return <div className="container-wrapper">{this.props.children}</div>;
  }
}

LayoutContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LayoutContainer;
