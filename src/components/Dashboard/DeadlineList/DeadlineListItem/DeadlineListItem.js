import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scss from './DeadlineListItem.scss';

export class DeadlineListItem extends Component {
  render() {
    const { companyName, jobType, deadline } = this.props;
    return (
      <div>
        <div> {deadline} </div>
        <div>
          {companyName} {jobType}
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
