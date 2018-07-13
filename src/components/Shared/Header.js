import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
      <header>
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
      </header>
    );
  }
}

export default Header;
