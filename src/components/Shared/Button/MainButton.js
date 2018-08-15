import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    boxShadow: '0 2px 6px 0 rgba(159, 159, 159, 0.5)',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
@withStyles(styles)
export class MainButton extends Component {
  render() {
    const { classes, text } = this.props;
    return (
      <Button
        className={classes.button}
        variant="contained"
        onClick={this.props.onClickButton}
      >
        {text}
      </Button>
    );
  }
}

MainButton.propTypes = {
  classes: PropTypes.object,
  onClickButton: PropTypes.func,
  text: PropTypes.string,
};

export default MainButton;
