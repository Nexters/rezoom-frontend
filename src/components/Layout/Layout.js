import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import Header from '../Shared/Header/Header';
import MyPage from '../MyPage/MyPage';
import withAuthGuard from '../../hocs/withAuthGuard';
import scss from './Layout.scss';
import { Files } from '../File/Files';
import { ResumeDetail, Resumes } from '../Resume';
import { Create } from '../Dialog/Create/Create';
import autobind from 'autobind-decorator';
import { Dialog } from '../Dialog/Dialog';

@connect(
  state => ({
    isLogin: state.auth.isLogin,
  }),
  {},
)
@withAuthGuard()
export class Layout extends Component {
  render() {
    const { isLogin } = this.props;
    return (
      <div className={scss['rezoom-container']}>
        <Header />
        <div className={scss['rezoom-contents']}>
          <Route exact path="/resume/:mode?" component={Resumes} />
          <Route
            exact
            path="/resume/:mode?/:id(.*)?"
            component={ResumeDetail}
          />
          <Route path="/files" component={Files} />
          <Route path="/mypage/:type?" component={MyPage} />
        </div>
        <Dialog />
      </div>
    );
  }
}

Layout.propTypes = {
  isLogin: PropTypes.bool,
};

export default Layout;
