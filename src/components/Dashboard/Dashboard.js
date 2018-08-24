import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import scss from './Dashboard.scss';
import DeadlineList from './DeadlineList/DeadlineList';
import ResumeGraph from './ResumeGraph/ResumeGraph';
import ResumeStatistics from './ResumeStatistics/ResumeStatistics';
import RecentClickList from './RecentClickList/RecentClickList';
import HashtagList from './HashtagList/HashtagList';
import Calendar from './Calendar/Calendar';
import {
  getDeadline,
  getResumeStatistics,
  getRecentClick,
  getHashtag,
  getName,
} from '../../store/Dashboard/Dashboard.store';

@connect(
  state => ({
    deadlineList: state.dashboard.deadline,
    resumeStatisticsList: state.dashboard.resumeStatistics,
    recentClickList: state.dashboard.recentClick,
    hashtagList: state.dashboard.hashtag,
    username: state.dashboard.name,
  }),
  {
    getDeadline,
    getResumeStatistics,
    getRecentClick,
    getHashtag,
    getName,
  },
)
export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getDeadline();
    this.props.getResumeStatistics();
    this.props.getRecentClick();
    this.props.getHashtag();
    this.props.getName();
  }

  render() {
    const {
      deadlineList,
      resumeStatisticsList,
      recentClickList,
      hashtagList,
      username,
    } = this.props;

    return (
      <div className={scss['dashboard']}>
        <div className={scss['dashboard__contents']}>
          <div className={scss['dashboard__contents--chart']}>
            <p> 자소서 현황 그래프 </p>
            <Card className={scss['card__chart']}>
              <div className={scss['card__chart--area']}>
                {/* 이력서 현황 그래프 */}
                <ResumeGraph resumeStatisticsList={resumeStatisticsList} />
              </div>
              <div className={scss['card__chart--text']}>
                {/* 이력서 현황 텍스트 */}
                <ResumeStatistics
                  resumeStatisticsList={resumeStatisticsList}
                  username={username}
                  deadlineList={deadlineList}
                />
              </div>
            </Card>
          </div>
          <div className={scss['dashboard__contents--bottom']}>
            <div className={scss['recent__document']}>
              <p> 최근 열람한 문서 </p>
              <Card className={scss['card__document']}>
                {/* 최근 열람한 문서 */}
                <RecentClickList recentClickList={recentClickList} />
              </Card>
            </div>
            <div className={scss['recent__hashtag']}>
              <p> 최근에 만든 해시태그 </p>
              <Card className={scss['card__hashtag']}>
                <HashtagList hashtagList={hashtagList} username={username} />
              </Card>
            </div>
          </div>
        </div>
        <div className={scss['dashboard__drawer']}>
          <div>
            {/* 지원 마감 이력서 달력 */}
            <p> 자소서 일정 달력 </p>
            <div>
              <Calendar deadlineList={deadlineList} />
            </div>
          </div>
          <div>
            {/* 지원 마감 이력서 리스트 */}
            <p> 마감 임박 미제출 자소서 </p>
            <DeadlineList deadlineList={deadlineList} />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getDeadline: PropTypes.func,
  getResumeStatistics: PropTypes.func,
  getRecentClick: PropTypes.func,
  getHashtag: PropTypes.func,
  getName: PropTypes.func,
  deadlineList: PropTypes.any,
  resumeStatisticsList: PropTypes.any,
  recentClickList: PropTypes.any,
  hashtagList: PropTypes.any,
  username: PropTypes.string,
};

export default Dashboard;
