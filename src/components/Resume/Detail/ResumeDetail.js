import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scss from './ResumeDetail.scss';

export class ResumeDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { match } = this.props;

    return (
      <div className={scss.resumes}>
        <p>Detail = {match['params'].id}</p>
      </div>
    );
  }
}

ResumeDetail.propTypes = {
  match: PropTypes.object,
};

export default ResumeDetail;
