import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, IconButton } from '@material-ui/core';
import { logout } from '../../../store/Auth/Auth.store';
import { dialogOpen } from '../../../store/Dialog/Dialog.store';
import {
  isUpdateModeChange,
  clearQuestionCache,
} from '../../../store/Resume/Resume.store';
import scss from './Header.scss';
import autobind from 'autobind-decorator';
import { DetailMenu } from './DetailMenu/DetailMenu';
import { MainButton } from '../Button/MainButton';
import logo from '../../../static/images/logo/ic-logo-width.svg';
import backIcon from '../../../static/images/item/back.svg';
import resumeIcon from '../../../static/images/menu/ic-nav-resumelist.svg';
import fileIcon from '../../../static/images/menu/ic-nav-manage-document.svg';
import dashboardIcon from '../../../static/images/menu/ic-nav-dashboard.svg';
import mypageIcon from '../../../static/images/menu/ic-nav-mypage.svg';

@withRouter
@connect(
  state => ({}),
  {
    logout,
    dialogOpen,
    isUpdateModeChange,
    clearQuestionCache,
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
    this.props.dialogOpen(location['pathname'], 'Create', 0);
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
          <MainButton
            onClickButton={this.onClickButtonAction}
            text={text}
            type="add"
            isDisabled={false}
          />
        </div>
      );
    }
    return buttonComponent;
  }

  @autobind
  backIconClick() {
    this.props.isUpdateModeChange(false);
    this.props.clearQuestionCache();
  }

  render() {
    const { classes, match, location } = this.props;
    let isDetail = false;
    if (match['params']['mode'] !== undefined) {
      isDetail = true;
    }
    let actionButton = this.checkRouter(location['pathname'], isDetail);

    return (
      <AppBar className={scss.header} position="static" color="inherit">
        <Toolbar className={scss['header__toolbar']}>
          <div className={scss['header__logo']}>
            {isDetail ? (
              <Link to="/resume" onClick={this.backIconClick}>
                <IconButton aria-label="back">
                  <img src={backIcon} alt="rezoom-logo" />
                </IconButton>
              </Link>
            ) : (
              <Link to="/resume">
                <img src={logo} alt="rezoom-logo" />
              </Link>
            )}
          </div>
          {actionButton}
          {isDetail ? (
            <DetailMenu resumeId={match.params.id} mode={match.params.mode} />
          ) : (
            <div className={scss['header__menu']}>
              <NavLink activeClassName={scss['active']} to="/dashboard">
                <img src={dashboardIcon} alt="menu-icons" />
                <p>대시보드</p>
              </NavLink>
              <NavLink activeClassName={scss['active']} to="/resume">
                <img src={resumeIcon} alt="menu-icons" />
                <p>자소서 리스트</p>
              </NavLink>
              <NavLink activeClassName={scss['active']} to="/files">
                <img src={fileIcon} alt="menu-icons" />
                <p>증빙자료 관리</p>
              </NavLink>
              <NavLink activeClassName={scss['active']} to="/mypage">
                <img src={mypageIcon} alt="menu-icons" />
                <p>마이페이지</p>
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
  isUpdateModeChange: PropTypes.func,
  clearQuestionCache: PropTypes.func,
};

export default Header;
