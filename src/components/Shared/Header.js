import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

@withStyles(styles)
class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <header className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Photos
            </Typography>
          </Toolbar>
          <ul style={{ display: 'flex', flexDirection: 'row' }}>
            <li style={{ width: 100 }}>
              <Link className="" to="/login">
                로그인
              </Link>
            </li>
            <li style={{ width: 100 }}>
              <Link className="" to="/jaso/new">
                자소서작성
              </Link>
            </li>
            <li style={{ width: 100 }}>
              <Link className="" to="/jaso/modify">
                자소서수정
              </Link>
            </li>
            <li style={{ width: 100 }}>
              <Link className="" to="/jaso/1/detail">
                자소서상세
              </Link>
            </li>
            <li style={{ width: 100 }}>
              <Link className="" to="/mypage/user">
                내정보
              </Link>
            </li>
            <li style={{ width: 100 }}>
              <Link className="" to="/search">
                검색
              </Link>
            </li>
          </ul>
        </AppBar>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Header;
