import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { logout } from '../../store/Auth/Auth.store';

const styles = {
  root: {
    flexGrow: 1,
  },
};
@withStyles(styles)
@connect(
  state => ({}),
  {
    logout,
  },
)
class Header extends Component {
  _onClickLogout(e) {
    e.stopPropagation();
    console.log('_onClickLogout!');
    this.props.logout();
  }

  render() {
    const { classes } = this.props;
    return (
      <header className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Photos
            </Typography>
            <Button onClick={e => this._onClickLogout(e)} color="inherit">
              로그아웃
            </Button>
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
  classes: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
};

export default Header;
