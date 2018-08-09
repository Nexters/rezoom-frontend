import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { logout } from '../../../store/Auth/Auth.store';
import { dialogOpen } from '../../../store/Dialog/Dialog.store';
import scss from './Header.scss';
import autobind from 'autobind-decorator';
import { DetailMenu } from './DetailMenu/DetailMenu';

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
    dialogOpen,
  },
)
class Header extends Component {
  @autobind
  onClickLogout(e) {
    e.stopPropagation();
    this.props.logout();
  }

  @autobind
  onClickButtonAction() {
    const { location } = this.props;
    this.props.dialogOpen(location['pathname']);
  }

  checkRouter(pathname, isDetail) {
    let text;
    let buttonComponent = null;
    // console.log(pathname.split('/')[1]);
    if (pathname.split('/')[1] === 'resume') {
      text = '자소서 작성';
    } else {
      text = '자료 올리기';
    }
    if (!isDetail) {
      buttonComponent = (
        <div className={scss['header__button']}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onClickButtonAction}
          >
            {text}
          </Button>
        </div>
      );
    }
    return buttonComponent;
  }

  render() {
    const { classes, match, location } = this.props;
    let isDetail = false;
    if (match['params']['mode'] !== undefined) {
      isDetail = true;
    }
    let actionButton = this.checkRouter(location['pathname'], isDetail);

    console.log('header match = ', this.props);

    return (
      <AppBar
        className={(scss.header, classes.root)}
        position="static"
        color="default"
      >
        <Toolbar className={classes.flex}>
          <div className={scss['header__logo']}>
            <div className={scss['header__logo--box']}>
              {isDetail ? <Link to="/resume">{'[< ]'}</Link> : null}
              <Link to="/resume">Logo</Link>
            </div>
          </div>
          {actionButton}
          {isDetail ? (
            <DetailMenu resumeId={match.params.id} mode={match.params.mode} />
          ) : (
            <div className={scss['header__menu']}>
              <NavLink className="" to="/resume">
                자소서 리스트
              </NavLink>
              <NavLink className="" to="/files">
                증빙자료 관리
              </NavLink>
            </div>
          )}
          <div className={scss['header__info']}>
            <Button onClick={e => this.onClickLogout(e)} color="inherit">
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
  location: PropTypes.object,
  dialogOpen: PropTypes.func,
};

export default Header;
