import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

class Layout extends Component {
  render() {
    return (
      <div className="main">
        <header>
          <ul style={{display: 'flex', flexDirection: 'row'}}>
            <li style={{width: 100}}><Link className="" to="login">로그인</Link></li>
            <li style={{width: 100}}><Link className="" to="jaso/new">자소서작성</Link></li>
            <li style={{width: 100}}><Link className="" to="jaso/modify">자소서수정</Link></li>
            <li style={{width: 100}}><Link className="" to="jaso/1/detail">자소서상세</Link></li>
            <li style={{width: 100}}><Link className="" to="mypage/user">내정보</Link></li>
            <li style={{width: 100}}><Link className="" to="search">검색</Link></li>
          </ul>
        </header>

        {this.switchContents()}

        <h1>main</h1>
      </div>
    );
  }

  switchContents() {
    return (
      <Switch>
        <Route path="/jaso/:type?" component={() => (<h1>자소서 - type : 작성, 수정, 상세</h1>)}/>
        <Route path="/mypage/:type?" component={() => (<h1>마이페이지</h1>)}/>
        <Route path="/search" component={() => (<h1>검색</h1>)}/>
      </Switch>
    )
  }
}



export default Layout;
