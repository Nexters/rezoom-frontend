import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import scss from './ResumeDetail.scss';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import { ResumeDetailForm } from './ResumeDetailForm';

@connect(
  state => ({
    resumes: state.resume.resumes,
    createCache: state.resume.createResumeCache,
  }),
  {},
)
export class ResumeDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);
    const { match, createCache, resumes } = this.props;
    const resumeId = Number(match['params'].id);
    let resumeData, resumeTitle;

    if (match['params']['mode']) {
      if (match['params']['mode'] === 'detail') {
        resumeData = resumes.filter(item => item.resumeId === resumeId)[0];
      } else if (match['params']['mode'] === 'create') {
        resumeData = createCache.info;
      }
      resumeTitle = `${resumeData['companyName']} ${
        resumeData['jobType']
      } [??]`;
    }

    // console.log(resumeData);
    return (
      <div className={scss.detail}>
        <div className={scss['detail__contents']}>
          <div className={scss['detail__contents--mode']}>
            {/* <Button variant="contained" color="primary">
              수정
            </Button>
            <Button variant="contained" color="primary">
              삭제
            </Button> */}
          </div>
          <div className={scss['detail__contents--header']}>
            <div className={scss['detail__contents--title']}>
              <p>
                {resumeTitle}
                <small>
                  [{resumeData ? resumeData['applicationType'] : ''}]
                </small>
              </p>
              <Button variant="contained" color="primary">
                {resumeData ? resumeData['passFlag'] : ''}
              </Button>
            </div>
            <div className={scss['detail__contents--subtitle']}>
              <p>
                {resumeData ? resumeData['applicationYear'] : ''}년{' '}
                {resumeData ? resumeData['halfType'] : ''}
              </p>
            </div>
          </div>
          <ResumeDetailForm mode={match['params']['mode']} />
        </div>
      </div>
    );
  }
}

ResumeDetail.propTypes = {
  match: PropTypes.object,
  resumes: PropTypes.array,
  createCache: PropTypes.any,
};

export default ResumeDetail;
