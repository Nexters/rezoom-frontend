import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scss from './RecentClickItem.scss';
import renctIcon from '../../../../static/images/dashboard/icon1.PNG';
import { Link } from 'react-router-dom';

export class RecentClickItem extends Component {
  render() {
    const { resumeId, companyName, jobType, clickDate } = this.props;
    return (
      <Link to={`/resume/detail/${resumeId}`} className={scss.recent__click}>
        <img src={renctIcon} alt="recent" />
        <div className={scss.recent__info}>
          <p className={scss.title}>
            {companyName} {jobType}
          </p>
          <p className={scss.date}>
            {clickDate}
            열어봄
          </p>
        </div>
      </Link>
    );
  }
}

RecentClickItem.propTypes = {
  resumeId: PropTypes.number,
  companyName: PropTypes.string,
  jobType: PropTypes.string,
  clickDate: PropTypes.any, // date?
};
