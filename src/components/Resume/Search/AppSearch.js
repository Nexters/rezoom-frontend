import React from 'react';
import keycode from 'keycode';
import compose from 'recompose/compose';
// import EventListener from 'react-event-listener';
import PropTypes from 'prop-types';
// import Router from 'next/router';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $inputInput': {
      transition: theme.transitions.create('width'),
      width: 120,
      '&:focus': {
        width: 170,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px ${theme.spacing.unit * 9}px`,
  },
});

class AppSearch extends React.Component {
  render() {
    const { classes, width } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <Input
          name={name}
          disableUnderline
          placeholder="검색어를 입력해주세요."
          id={name}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(AppSearch);
