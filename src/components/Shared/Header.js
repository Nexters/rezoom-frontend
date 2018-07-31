import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { logout } from '../../store/Auth/Auth.store';
import scss from './Header.scss';

const styles = {
  root: {
    maxWidth: 200,
    width: 200,
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};
@withStyles(styles)
@withRouter
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
    const { classes, match } = this.props;
    let backButton = false;

    console.log('header match = ', match);

    if (match['params']['mode'] === 'detail') {
      backButton = true;
    }

    return (
      <AppBar
        className={(scss.header, classes.root)}
        position="static"
        color="default"
      >
        <Toolbar className={classes.flex}>
          <div className={scss['header__logo']}>
            {backButton ? <Link to="/resume">{'[< ]'}</Link> : null}
            <Link to="/resume">Logo</Link>
          </div>
          <div className={scss['header__menu']}>
            <ul>
              <li style={{ width: 100 }}>
                <Link className="" to="/resume">
                  자소서 리스트
                </Link>
              </li>
              <li style={{ width: 100 }}>
                <Link className="" to="/files">
                  증빙자료 관리
                </Link>
              </li>
            </ul>
          </div>
          <div className={scss['header__info']}>
            <Button onClick={e => this._onClickLogout(e)} color="inherit">
              로그아웃
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
  match: PropTypes.object,
};

export default Header;
