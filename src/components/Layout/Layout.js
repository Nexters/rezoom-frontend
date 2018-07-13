import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Shared/Header';
import { LayoutContainer } from '../../containers/LayoutContainer';
import MyPage from '../MyPage/MyPage';

class Layout extends Component {
  render() {
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

export default Layout;
