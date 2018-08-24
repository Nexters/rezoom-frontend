import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RecentClickItem extends Component {
  render() {
    const { resumeId, companyName, jobType, clickDate } = this.props;
    return (
      <div>
        <div> {resumeId} </div>
        <div>
          {companyName} {jobType}
        </div>
        <div>
          {clickDate}
          열어봄
        </div>
      </div>
    );
  }
}

RecentClickItem.propTypes = {
  resumeId: PropTypes.number,
  companyName: PropTypes.string,
  jobType: PropTypes.string,
  clickDate: PropTypes.any, // date?
};
