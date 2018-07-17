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

        <Route path="/jaso/new" component={() => <h1>new!</h1>} />
        <Route path="/jaso/modify" component={() => <h1>modify</h1>} />
        <Route path="/jaso/:id?/detail" component={() => <h1>detail</h1>} />
        <Route path="/mypage/:type?" component={MyPage} />
        <Route path="/search" component={() => <h1>검색</h1>} />
      </LayoutContainer>
    );
  }
}

Layout.propTypes = {
  isLogin: PropTypes.bool,
};

export default Layout;
