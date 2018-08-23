import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ResumeStatistics extends Component {
  static propTypes = {
    resumeStatisticsList: PropTypes.any,
  };

  render() {
    const { resumeStatisticsList } = this.props;
    return (
      <div>
        <div>
          {resumeStatisticsList.pass.title}
          {resumeStatisticsList.pass.resumeNum}
          {resumeStatisticsList.pass.ratio}
        </div>
        <div>
          {resumeStatisticsList.submit.title}
          {resumeStatisticsList.submit.resumeNum}
          {resumeStatisticsList.submit.ratio}
        </div>
        <div>
          {resumeStatisticsList.nonSubmit.title}
          {resumeStatisticsList.nonSubmit.resumeNum}
          {resumeStatisticsList.nonSubmit.ratio}
        </div>
        <div>
          {resumeStatisticsList.nonPass.title}
          {resumeStatisticsList.nonPass.resumeNum}
          {resumeStatisticsList.nonPass.ratio}
        </div>
      </div>
    );
  }
}

export default ResumeStatistics;
