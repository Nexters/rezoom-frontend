import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import Header from '../Shared/Header';
import { LayoutContainer } from '../../containers/LayoutContainer';
import MyPage from '../MyPage/MyPage';
import withAuthGuard from '../../hocs/withAuthGuard';

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
      <LayoutContainer>
        <Header />

        <Route path="/resume" component={() => <h1>new!</h1>} />
        <Route path="/files" component={() => <h1>파일</h1>} />
        <Route path="/mypage/:type?" component={MyPage} />
      </LayoutContainer>
    );
  }
}

Layout.propTypes = {
  isLogin: PropTypes.bool,
};

export default Layout;
