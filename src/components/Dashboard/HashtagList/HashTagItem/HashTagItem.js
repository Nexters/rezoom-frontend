import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class HashTagItem extends Component {
  render() {
    const { hashtagId, hashtagKeyword } = this.props;
    return (
      <div>
        <div>
          {hashtagId} &nbsp;
          {hashtagKeyword}
        </div>
      </div>
    );
  }
}

HashTagItem.propTypes = {
  hashtagId: PropTypes.number,
  hashtagKeyword: PropTypes.string,
};
