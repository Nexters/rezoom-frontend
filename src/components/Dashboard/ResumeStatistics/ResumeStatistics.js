import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ResumeStatistics extends Component {
  static propTypes = {
    resumeStatisticsList: PropTypes.any,
    username: PropTypes.string,
    deadlineList: PropTypes.any,
  };

  render() {
    const { resumeStatisticsList, username, deadlineList } = this.props;
    return (
      <div>
        <div>{username}님의 자기소개서 현황입니다.</div>
        <div>
          {resumeStatisticsList.pass.title} &nbsp;
          {resumeStatisticsList.pass.resumeNum}개 &nbsp;
          {resumeStatisticsList.pass.ratio}%
        </div>
        <div>
          {resumeStatisticsList.submit.title} &nbsp;
          {resumeStatisticsList.submit.resumeNum}개 &nbsp;
          {resumeStatisticsList.submit.ratio}% &nbsp;
        </div>
        <div>
          {resumeStatisticsList.nonSubmit.title} &nbsp;
          {resumeStatisticsList.nonSubmit.resumeNum}개 &nbsp;
          {resumeStatisticsList.nonSubmit.ratio}% &nbsp;
        </div>
        <div>
          {resumeStatisticsList.nonPass.title} &nbsp;
          {resumeStatisticsList.nonPass.resumeNum}개 &nbsp;
          {resumeStatisticsList.nonPass.ratio}% &nbsp;
        </div>
      </div>
    );
  }
}

export default ResumeStatistics;
