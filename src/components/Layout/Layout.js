import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import Header from '../Shared/Header';
import MyPage from '../MyPage/MyPage';
import withAuthGuard from '../../hocs/withAuthGuard';
import { Resumes } from '../Resume/Resumes';
import scss from './Layout.scss';
import { Files } from '../File/Files';
import { ResumeDetail } from '../Resume/Detail/ResumeDetail';

@connect(
  state => ({
    isLogin: state.auth.isLogin,
  }),
  {},
)
@withAuthGuard()
class Layout extends Component {
  render() {
    const { isLogin } = this.props;
    return (
      <div className={scss['rezoom-container']}>
        <Header />

        <div className={scss['rezoom-contents']}>
          <Route exact path="/resume" component={Resumes} />
          <Route path="/resume/:id?" component={ResumeDetail} />
          <Route path="/files" component={Files} />
          <Route path="/mypage/:type?" component={MyPage} />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  isLogin: PropTypes.bool,
};

export default Layout;
