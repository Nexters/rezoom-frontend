import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scss from './DeadlineListItem.scss';

export class DeadlineListItem extends Component {
  render() {
    const { companyName, jobType, deadline } = this.props;
    return (
      <div className={scss.deadline}>
        <div className={scss.square} />
        <div className={scss.item}>
          <p className={scss.date}> {deadline} </p>
          <p className={scss.info}>
            {companyName} {jobType}
          </p>
        </div>
      </div>
    );
  }
}

DeadlineListItem.propTypes = {
  companyName: PropTypes.string,
  jobType: PropTypes.string,
  deadline: PropTypes.string,
};
