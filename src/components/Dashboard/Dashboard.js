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
import CalendarItem from './Calendar/CalendarItem';
import {
  getDeadline,
  getResumeStatistics,
  getRecentClick,
  getHashtag,
  getName,
} from '../../store/Dashboard/Dashboard.store';
import { getResumeList } from '../../store/Resume/Resume.store';
import Scrollbars from 'react-custom-scrollbars';

@connect(
  state => ({
    deadlineList: state.dashboard.deadline,
    resumeStatisticsList: state.dashboard.resumeStatistics,
    recentClickList: state.dashboard.recentClick,
    hashtagList: state.dashboard.hashtag,
    username: state.dashboard.name,
    resumes: state.resume.resumes,
  }),
  {
    getDeadline,
    getResumeStatistics,
    getRecentClick,
    getHashtag,
    getName,
    getResumeList,
  },
)
export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getResumeList();
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
      resumes,
    } = this.props;

    return (
      <div className={scss['dashboard']}>
        <div className={scss['dashboard__contents']}>
          <Scrollbars
            autoHide
            autoHideTimeout={100}
            autoHideDuration={100}
            autoHeightMin={'100%'}
            autoHeightMax={'100%'}
            thumbMinSize={30}
            universal={true}
            className={scss.scroll__content}
          >
            <div className={scss['dashboard__contents--chart']}>
              <p> 자소서 현황 그래프 </p>
              <Card className={scss['card__chart']}>
                {/* 이력서 현황 그래프 */}
                <ResumeGraph resumeStatisticsList={resumeStatisticsList} />

                <div className={scss['card__chart--text']}>
                  {/* 이력서 현황 텍스트 */}
                  <ResumeStatistics
                    resumeStatisticsList={resumeStatisticsList}
                    username={username}
                    deadlineList={deadlineList}
                    resumes={resumes}
                  />
                </div>
              </Card>
            </div>
            <div className={scss['dashboard__contents--bottom']}>
              <div className={scss['recent__document']}>
                <p> 최근 열람한 문서 </p>
                <Card className={scss['card__document']}>
                  <Scrollbars
                    autoHide
                    autoHideTimeout={100}
                    autoHideDuration={100}
                    autoHeightMin={'100%'}
                    autoHeightMax={'100%'}
                    thumbMinSize={30}
                    universal={true}
                    className={scss.scroll}
                  >
                    {/* 최근 열람한 문서 */}
                    <RecentClickList recentClickList={recentClickList} />
                  </Scrollbars>
                </Card>
              </div>
              <div className={scss['recent__hashtag']}>
                <p> 최근에 만든 해시태그 </p>
                <Card className={scss['card__hashtag']}>
                  <HashtagList hashtagList={hashtagList} username={username} />
                </Card>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={scss['dashboard__drawer']}>
          {/* 지원 마감 이력서 달력 */}
          <p className={scss['dashboard__drawer--title']}>자소서 일정 달력 </p>
          <CalendarItem deadlineList={deadlineList} />
          {/* 지원 마감 이력서 리스트 */}
          <p
            className={scss['dashboard__drawer--title']}
            style={{ marginTop: 22 }}
          >
            마감 임박 미제출 자소서
          </p>
          <DeadlineList deadlineList={deadlineList} />
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
  getResumeList: PropTypes.func,
  deadlineList: PropTypes.any,
  resumeStatisticsList: PropTypes.any,
  recentClickList: PropTypes.any,
  hashtagList: PropTypes.any,
  username: PropTypes.string,
  resumes: PropTypes.array,
};

export default Dashboard;
