import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chip, withStyles } from '@material-ui/core';

const styles = {
  chip: {
    height: 41,
    borderRadius: 20.5,
    backgroundColor: '#ffffff',
    border: 'solid 1px #ced8ea',
    marginRight: 12,
    marginBottom: 8,
  },
};
@withStyles(styles)
export class HashTagItem extends Component {
  render() {
    const { hashtagId, hashtagKeyword, classes } = this.props;
    return (
      <Chip
        className={classes.chip}
        key={hashtagId}
        label={`#${hashtagKeyword}`}
        color="primary"
      />
    );
  }
}

HashTagItem.propTypes = {
  hashtagId: PropTypes.number,
  hashtagKeyword: PropTypes.string,
  classes: PropTypes.object,
};
