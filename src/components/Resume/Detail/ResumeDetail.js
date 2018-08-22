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
} from '../../../store/Resume/Resume.store';
import { dialogOpen } from '../../../store/Dialog/Dialog.store';
import editIcon from '../../../static/images/item/ic-edit-alter.svg';
import moment from 'moment';

@connect(
  state => ({
    resumes: state.resume.resumes,
    createCache: state.resume.createResumeCache,
  }),
  {
    requestCreateQuestion,
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
        passFlag: 0,
        resumeId: 0,
        username: '',
      },
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
        console.log('resumes.length = ', resumes.length);
        console.log('nextProps.resumes.length = ', nextProps.resumes.length);
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
    const { requestCreateQuestion, match } = this.props;

    requestCreateQuestion(match.params.id);
  }

  render() {
    const { match } = this.props;
    const { resumeData } = this.state;

    return (
      <div className={scss.detail}>
        <div className={scss['detail__contents']}>
          <div className={scss['detail__contents--header']}>
            <div className={scss['detail__contents--title']}>
              <p>
                {resumeData['companyName']}
                <Button
                  aria-haspopup="true"
                  onClick={e => this.onClickChangeInfo(e)}
                >
                  <img src={editIcon} alt="editIcon" />정보수정
                </Button>
              </p>
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
                isDisabled={false}
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
};

export default ResumeDetail;
