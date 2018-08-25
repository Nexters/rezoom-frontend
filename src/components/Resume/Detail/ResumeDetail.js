import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import scss from './ResumeDetail.scss';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import { ResumeDetailForm } from './ResumeDetailForm';
import { ListItemInfo } from '../List/ListItemInfo';
import { MainButton } from '../../Shared/Button/MainButton';
import {
  requestCreateQuestion,
  getResumeList,
  requestUpdateQuestion,
} from '../../../store/Resume/Resume.store';
import { dialogOpen } from '../../../store/Dialog/Dialog.store';
import editIcon from '../../../static/images/item/ic-edit-alter.svg';
import moment from 'moment';
import passLabel from '../../../static/images/label/ic-status-label-pass.svg';
import failedLabel from '../../../static/images/label/ic-status-label-failed.svg';

@connect(
  state => ({
    resumes: state.resume.resumes,
    createCache: state.resume.createResumeCache,
    isUpdateMode: state.resume.isUpdateMode,
  }),
  {
    requestCreateQuestion,
    requestUpdateQuestion,
    dialogOpen,
    getResumeList,
  },
)
export class ResumeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resumeData: {
        applicationType: '',
        applicationYear: moment().format('YYYY'),
        companyName: '',
        createDate: '',
        deadline: moment().format('YYYY-MM-DD HH'),
        finishFlag: '',
        halfType: '',
        jobType: '',
        passFlag: 2,
        resumeId: 0,
        username: '',
      },
      questionsUpdateFlag: false,
    };
  }

  componentWillMount() {
    const { resumes, getResumeList, match, createCache } = this.props;
    if (resumes.length === 0) {
      getResumeList();
    } else {
      const resumeId = Number(match['params'].id);
      this.setState({
        resumeData: resumes.filter(item => item.resumeId === resumeId)[0],
      });
    }
    if (match['params']['mode'] === 'create') {
      this.setState({
        resumeData: createCache.info,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { resumes, match } = this.props;
    const resumeId = Number(match['params'].id);

    if (match['params']['mode']) {
      if (match['params']['mode'] === 'detail') {
        if (resumes.length !== nextProps.resumes.length) {
          this.setState({
            resumeData: nextProps.resumes.filter(
              item => item.resumeId === resumeId,
            )[0],
          });
        }
      }
    }
  }

  @autobind
  onClickChangeInfo(e) {
    e.stopPropagation();
    const { dialogOpen, match } = this.props;
    dialogOpen('/resume', 'Edit', 0);
  }

  @autobind
  saveQuestions() {
    const { requestCreateQuestion, match, requestUpdateQuestion } = this.props;

    if (match['params']['mode'] === 'create') {
      requestCreateQuestion(match.params.id);
    } else {
      requestUpdateQuestion(match.params.id);
    }
  }

  render() {
    const { match, isUpdateMode } = this.props;
    const { resumeData } = this.state;

    let isUpdate = isUpdateMode;

    if (match['params']['mode'] === 'create') {
      isUpdate = true;
    }

    let label, labelText;
    if (resumeData['passFlag'] === 0) {
      label = failedLabel;
      labelText = '불합격';
    } else if (resumeData['passFlag'] === 1) {
      label = passLabel;
      labelText = '합격';
    }

    return (
      <div className={scss.detail}>
        <div className={scss['detail__contents']}>
          <div className={scss['detail__contents--header']}>
            <div className={scss['detail__contents--label']}>
              {resumeData['passFlag'] !== 2 ? (
                <img src={label} alt="card label" />
              ) : null}
              {resumeData['passFlag'] !== 2 ? <p>{labelText}</p> : null}
            </div>
            <div className={scss['detail__contents--title']}>
              <div>
                <p>{resumeData['companyName']}</p>
                <Button
                  aria-haspopup="true"
                  onClick={e => this.onClickChangeInfo(e)}
                >
                  <img src={editIcon} alt="editIcon" />정보수정
                </Button>
              </div>
              <p>{resumeData['jobType']}</p>
            </div>
            <div className={scss['detail__contents--subtitle']}>
              <ListItemInfo
                applicationType={resumeData['applicationType']}
                applicationYear={Number(resumeData['applicationYear'])}
                halfType={resumeData['halfType']}
                finishFlag={resumeData['finishFlag']}
              />
              <MainButton
                onClickButton={this.saveQuestions}
                text={'저장하기'}
                type="save"
                isDisabled={!isUpdate}
              />
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
  dialogOpen: PropTypes.func,
  getResumeList: PropTypes.func,
  requestUpdateQuestion: PropTypes.func,
  isUpdateMode: PropTypes.bool,
};

export default ResumeDetail;
