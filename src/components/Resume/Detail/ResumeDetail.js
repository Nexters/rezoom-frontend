import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import scss from './ResumeDetail.scss';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import { ResumeDetailForm } from './ResumeDetailForm';
import { ListItemInfo } from '../List/ListItemInfo';
import { MainButton } from '../../Shared/Button/MainButton';
import { requestCreateQuestion } from '../../../store/Resume/Resume.store';
@connect(
  state => ({
    resumes: state.resume.resumes,
    createCache: state.resume.createResumeCache,
  }),
  {
    requestCreateQuestion,
  },
)
export class ResumeDetail extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onClickChangeInfo() {}

  @autobind
  saveQuestions() {
    const { requestCreateQuestion, match } = this.props;

    requestCreateQuestion(match.params.id);
  }

  render() {
    // console.log(this.props);
    const { match, createCache, resumes } = this.props;
    const resumeId = Number(match['params'].id);
    let resumeData, resumeTitle;

    if (match['params']['mode']) {
      if (match['params']['mode'] === 'detail') {
        resumeData = resumes.filter(item => item.resumeId === resumeId)[0];
        resumeTitle = resumeData['companyName'];
      } else if (match['params']['mode'] === 'create') {
        resumeData = createCache.info;
        resumeTitle = resumeData.companyName;
      }
    }

    // console.log(resumeData);
    return (
      <div className={scss.detail}>
        <div className={scss['detail__contents']}>
          <div className={scss['detail__contents--header']}>
            <div className={scss['detail__contents--title']}>
              <p>{resumeTitle}</p>
              {/* <Button variant="contained" color="primary">
                {resumeData ? resumeData['passFlag'] : ''}
              </Button> */}
            </div>
            <div className={scss['detail__contents--subtitle']}>
              <ListItemInfo
                applicationType={resumeData['applicationType']}
                applicationYear={resumeData['applicationYear']}
                halfType={resumeData['halfType']}
                finishFlag={resumeData['finishFlag']}
              />
              <MainButton
                onClickButton={this.onClickChangeInfo}
                text={'정보수정'}
              />
              <MainButton onClickButton={this.saveQuestions} text={'test'} />
            </div>
          </div>
          <div className={scss['detail__contents--form']}>
            <ResumeDetailForm mode={match['params']['mode']} />
          </div>
        </div>
      </div>
    );
  }
}

ResumeDetail.propTypes = {
  match: PropTypes.object,
  resumes: PropTypes.array,
  createCache: PropTypes.any,
  requestCreateQuestion: PropTypes.func,
};

export default ResumeDetail;
