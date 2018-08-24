import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reduxForm, submit, change, getFormValues } from 'redux-form';
import {
  createNewResume,
  editResumeInfoData,
} from '../../../store/Resume/Resume.store';
import autobind from 'autobind-decorator';
import { withStyles, CircularProgress, IconButton } from '@material-ui/core';
import { resumeCreateFormData } from '../../../utils/Constans';
import CloseIcon from '../../../static/images/item/ic-delete-cancel.svg';
import inputIcon from '../../../static/images/create/ic-edit.svg';
import dateIcon from '../../../static/images/create/ic-dropdown-date.svg';
import scss from './Create.scss';
import { SelectCreate } from '../../Forms/SelectCreate';
import { SelectChange } from '../../Forms/SelectChange';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import moment from 'moment';
import 'moment/locale/ko';
import { MainButton } from '../../Shared/Button/MainButton';
import { FilterUtils } from '../../../utils/FilterUtils';

moment.locale('ko');

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: '#364eda',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});
@withStyles(styles)
@reduxForm({
  form: 'newResume',
  enableReinitialize: true,
  initialValues: {
    companyName: '',
    jobType: '',
    applicationYear: 2018,
    halfType: '상반기',
    applicationType: '0',
    finishFlag: 0,
    passFlag: 2,
    deadline: moment().format('YYYY-MM-DD HH'),
    // TODO: deadline YYYY-MM-DD HH
  },
  onSubmit: (values, dispatch) => {
    dispatch(createNewResume(values));
  },
})
@connect(
  state => ({
    initialValues: state.resume.createResumeCache.info,
    loading: state.loader.component,
    formValues: getFormValues('newResume')(state),
  }),
  {
    submit: () => submit('newResume'),
    change: (key, value) => change('newResume', key, value),
    editResumeInfoData,
  },
)
@withRouter
export class Create extends Component {
  constructor(props) {
    super(props);

    const {
      applicationYear,
      halfType,
      applicationType,
      finishFlag,
      passFlag,
    } = resumeCreateFormData;

    this.state = {
      applicationYear,
      halfType,
      applicationType,
      finishFlag,
      passFlag,
      deadline: moment().format('YYYY-MM-DD HH'),
      init: true,
      passFlagActive: true,
      companyNameRequired: false,
      jobTypeRequired: false,
      requiredCount: 0,
    };
  }

  componentDidMount() {
    const { mode, match, editResumeInfoData, id } = this.props;

    if (mode === 'Edit') {
      if (id !== 0) {
        editResumeInfoData(id);
      } else {
        editResumeInfoData(match['params']['id']);
      }
      this.setEditForm();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { change, mode, match, initialValues } = this.props;
    const { applicationType, finishFlag } = resumeCreateFormData;

    if (this.state.init) {
      if (mode === 'Edit') {
        if (nextProps.initialValues === undefined) {
          change('companyName', initialValues.companyName);
          change('applicationYear', initialValues.applicationYear);
          change('halfType', initialValues.halfType);
          change('jobType', initialValues.jobType);
          change(
            'applicationType',
            FilterUtils.getKey(applicationType, initialValues.applicationType),
          );
          change(
            'finishFlag',
            FilterUtils.getKey(finishFlag, initialValues.finishFlag),
          );
          change('passFlag', initialValues.passFlag);
          change('resumeId', match['params']['id']);
          change('mode', mode);
        } else {
          change('companyName', nextProps.initialValues.companyName);
          change('applicationYear', nextProps.initialValues.applicationYear);
          change('halfType', nextProps.initialValues.halfType);
          change('jobType', nextProps.initialValues.jobType);
          change(
            'applicationType',
            FilterUtils.getKey(
              applicationType,
              nextProps.initialValues.applicationType,
            ),
          );
          change(
            'finishFlag',
            FilterUtils.getKey(finishFlag, nextProps.initialValues.finishFlag),
          );
          change('passFlag', nextProps.initialValues.passFlag);
          change('resumeId', nextProps.initialValues.resumeId);
          change('mode', mode);
        }
        this.setState({
          init: false,
        });
      }
    }
  }

  setEditForm() {
    const { initialValues, change, mode } = this.props;
    const { applicationType, finishFlag } = resumeCreateFormData;

    change('companyName', initialValues.companyName);
    change('applicationYear', initialValues.applicationYear);
    change('halfType', initialValues.halfType);
    change('jobType', initialValues.jobType);
    change(
      'applicationType',
      FilterUtils.getKey(applicationType, initialValues.applicationType),
    );
    change(
      'finishFlag',
      FilterUtils.getKey(finishFlag, initialValues.finishFlag),
    );
    change('passFlag', initialValues.passFlag);
    change('resumeId', initialValues.resumeId);
    change('mode', mode);
  }

  @autobind
  handleSubmit() {
    const { formValues } = this.props;

    const companyNameRequired = formValues.companyName.length === 0;
    const jobTypeRequired = formValues.jobType.length === 0;

    let result = true;
    let requiredCount = 0;

    if (companyNameRequired || jobTypeRequired) {
      result = false;
    }

    requiredCount = companyNameRequired ? 1 : 0;
    requiredCount = jobTypeRequired ? requiredCount + 1 : requiredCount;

    this.setState({
      companyNameRequired: companyNameRequired,
      jobTypeRequired: jobTypeRequired,
      requiredCount: requiredCount,
    });

    if (result) {
      this.props.submit();
    }
  }

  @autobind
  handleDateChange(date) {
    const convertDate = moment(date).format('YYYY-MM-DD HH');
    console.log(convertDate);

    this.setState({ deadline: date });
    this.props.change('deadline', convertDate);
  }

  @autobind
  changeFinishFlag(value) {
    console.log(value);
    if (value === 0) {
      this.setState({
        passFlagActive: true,
      });
    } else {
      this.setState({
        passFlagActive: false,
      });
    }
  }

  @autobind
  onChangeCompanyName(e, value) {
    let requiredCount = this.state.requiredCount;

    if (value.length === 0) {
      requiredCount = requiredCount + 1;

      if (requiredCount > 2) {
        requiredCount = 2;
      }
    } else if (value.length > 0) {
      requiredCount = requiredCount - 1;

      if (requiredCount < 0) {
        requiredCount = 0;
      }
    }

    this.setState({
      companyNameRequired: value.length === 0,
      requiredCount: requiredCount,
    });
  }

  @autobind
  onChangeJobType(e, value) {
    let requiredCount = this.state.requiredCount;

    if (value.length === 0) {
      requiredCount = requiredCount + 1;

      if (requiredCount > 2) {
        requiredCount = 2;
      }
    } else if (value.length > 0) {
      requiredCount = requiredCount - 1;

      if (requiredCount < 0) {
        requiredCount = 0;
      }
    }

    this.setState({
      jobTypeRequired: value.length === 0,
      requiredCount: requiredCount,
    });
  }

  render() {
    const { dialogOpen, classes, loading } = this.props;
    const {
      applicationYear,
      halfType,
      applicationType,
      finishFlag,
      passFlag,
      deadline,
      passFlagActive,
      companyNameRequired,
      jobTypeRequired,
      requiredCount,
    } = this.state;

    return (
      <div>
        <Dialog
          open={dialogOpen}
          aria-labelledby="form-dialog-title"
          className={scss['create']}
        >
          <DialogTitle id="form-dialog-title" className={scss['create__title']}>
            <div className={scss['create__title--contents']}>
              <p>자소서 작성</p>
              <IconButton
                className={''}
                aria-label="Delete"
                onClick={this.props.onDialogClose}
              >
                <img src={CloseIcon} alt="closeIcon" />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent className={scss['create__contents']}>
            <form>
              <Field
                name="resumeId"
                component="input"
                type="text"
                style={{ display: 'none' }}
              />
              <Field
                name="mode"
                component="input"
                type="text"
                style={{ display: 'none' }}
              />
              <div
                className={scss['create__full']}
                style={{
                  background: companyNameRequired ? '#fffcdc' : '#ffffff',
                }}
              >
                {companyNameRequired ? <div className={scss.dot} /> : null}
                <p>회사명</p>
                <div className={scss['create__full--item']}>
                  <Field
                    name="companyName"
                    component="input"
                    type="text"
                    placeholder="회사명"
                    onChange={this.onChangeCompanyName}
                    style={{ background: 'transparent' }}
                  />
                  <img src={inputIcon} alt="inputIcon" />
                </div>
              </div>

              <div className={scss['create__division']}>
                <SelectCreate
                  name={'applicationYear'}
                  label={'연도'}
                  items={applicationYear}
                  disabled={false}
                />
                <SelectCreate
                  name={'halfType'}
                  label={'분기'}
                  items={halfType}
                  disabled={false}
                />
              </div>

              <div className={scss['create__full']}>
                <p>제출마감일</p>
                <div className={scss['create__full--item']}>
                  <Field
                    name="deadline"
                    component="input"
                    type="text"
                    style={{ display: 'none' }}
                  />
                  <MuiPickersUtilsProvider
                    utils={MomentUtils}
                    locale={'ko'}
                    moment={moment}
                  >
                    <DateTimePicker
                      value={deadline}
                      onChange={this.handleDateChange}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <img src={dateIcon} alt="dateIcon" />
                </div>
              </div>

              <div
                className={scss['create__full']}
                style={{
                  background: jobTypeRequired ? '#fffcdc' : '#ffffff',
                }}
              >
                {jobTypeRequired ? <div className={scss.dot} /> : null}
                <p>직무</p>
                <div className={scss['create__full--item']}>
                  <Field
                    name="jobType"
                    component="input"
                    type="text"
                    placeholder="직무"
                    onChange={this.onChangeJobType}
                    style={{ background: 'transparent' }}
                  />
                  <img src={inputIcon} alt="inputIcon" />
                </div>
              </div>

              <div className={scss['create__full']}>
                <SelectCreate
                  name={'applicationType'}
                  label={'형태'}
                  items={applicationType}
                  disabled={false}
                />
              </div>

              <div className={scss['create__division']}>
                <SelectChange
                  name={'finishFlag'}
                  label={'제출 여부'}
                  items={finishFlag}
                  onChange={this.changeFinishFlag}
                />
                <SelectCreate
                  name={'passFlag'}
                  label={'합격 여부'}
                  items={passFlag}
                  disabled={passFlagActive}
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            {requiredCount > 0 ? (
              <p className={scss.required__count}>
                {requiredCount}개의 항목을 입력하지 않았습니다.
              </p>
            ) : null}
            <div className={classes.wrapper}>
              <MainButton
                onClickButton={this.handleSubmit}
                text={'다음'}
                type="next"
                isDisabled={loading}
              />
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object,
  submit: PropTypes.func,
  dialogOpen: PropTypes.bool,
  onDialogClose: PropTypes.func,
  change: PropTypes.func,
  mode: PropTypes.string,
  initialize: PropTypes.func,
  match: PropTypes.object,
  editResumeInfoData: PropTypes.func,
  initialValues: PropTypes.object,
  loading: PropTypes.bool,
  id: PropTypes.number,
  formValues: PropTypes.object,
};

export default Create;
