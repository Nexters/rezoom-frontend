import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import nextIcon from '../../../static/images/button/ic-next.svg';
import addIcon from '../../../static/images/button/ic-add.svg';
import saveIcon from '../../../static/images/button/ic-save.svg';

const styles = theme => ({
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    boxShadow: '0 2px 6px 0 rgba(159, 159, 159, 0.5)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  img: {
    marginRight: 11,
  },
});
@withStyles(styles)
export class MainButton extends Component {
  render() {
    const { classes, text, type, isDisabled } = this.props;
    let icon;

    if (type === 'save') {
      icon = saveIcon;
    } else if (type === 'add') {
      icon = addIcon;
    } else if (type === 'next') {
      icon = nextIcon;
    }

    return (
      <Button
        className={classes.button}
        variant="contained"
        onClick={this.props.onClickButton}
        disabled={isDisabled}
      >
        <img src={icon} alt="buttonIcon" className={classes.img} />
        {text}
      </Button>
    );
  }
}

MainButton.propTypes = {
  classes: PropTypes.object,
  onClickButton: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default MainButton;
