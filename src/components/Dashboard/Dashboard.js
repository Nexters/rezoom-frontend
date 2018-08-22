import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import scss from './Dashboard.scss';

@connect(
  state => ({}),
  {},
)
export class Dashboard extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className={scss['dashboard']}>
        <div className={scss['dashboard__contents']}>
          <div className={scss['dashboard__contents--chart']}>
            <p>자소서 현황 그래프</p>
            <Card className={scss['card__chart']}>
              <div className={scss['card__chart--area']}>차트</div>
              <div className={scss['card__chart--text']}>글</div>
            </Card>
          </div>
          <div className={scss['dashboard__contents--bottom']}>
            <div className={scss['recent__document']}>
              <p>최근 열람한 문서</p>
              <Card className={scss['card__document']}>
                <div>글</div>
              </Card>
            </div>
            <div className={scss['recent__hashtag']}>
              <p>최근에 만든 해시태그</p>
              <Card className={scss['card__hashtag']}>
                <div>차트</div>
              </Card>
            </div>
          </div>
        </div>
        <div className={scss['dashboard__drawer']}>
          <div>
            <p>자소서 일정 달력</p>
            <div>1</div>
          </div>
          <div>
            <p>마감임박 미제출 자소서</p>
            <div>2</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;