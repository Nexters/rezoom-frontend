import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reduxForm, submit, change } from 'redux-form';
import {
  createNewResume,
  editResumeInfoData,
} from '../../../store/Resume/Resume.store';
import autobind from 'autobind-decorator';
import { withStyles, CircularProgress, IconButton } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { resumeCreateFormData } from '../../../utils/Constans';
import CloseIcon from '../../../static/images/item/ic-delete-cancel.svg';
import inputIcon from '../../../static/images/create/ic-edit.svg';
import dateIcon from '../../../static/images/create/ic-dropdown-date.svg';
import scss from './Create.scss';
import { SelectCreate } from '../../Forms/SelectCreate';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import moment from 'moment';
import 'moment/locale/ko';
import { MainButton } from '../../Shared/Button/MainButton';

moment.locale('ko');

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
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
    applicationYear: 2018,
    halfType: '상반기',
    applicationType: '0',
    finishFlag: 0,
    passFlag: 0,
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
    const { change, mode } = this.props;

    if (this.state.init) {
      if (mode === 'Edit') {
        change('companyName', nextProps.initialValues.companyName);
        change('applicationYear', nextProps.initialValues.applicationYear);
        change('halfType', nextProps.initialValues.halfType);
        change('jobType', nextProps.initialValues.jobType);
        change('applicationType', nextProps.initialValues.applicationType);
        change('finishFlag', nextProps.initialValues.finishFlag);
        change('passFlag', nextProps.initialValues.passFlag);
        change('resumeId', nextProps.initialValues.resumeId);
        change('mode', mode);
        this.setState({
          init: false,
        });
      }
    }
  }

  setEditForm() {
    const { initialValues, change, mode } = this.props;

    change('companyName', initialValues.companyName);
    change('applicationYear', initialValues.applicationYear);
    change('halfType', initialValues.halfType);
    change('jobType', initialValues.jobType);
    change('applicationType', initialValues.applicationType);
    change('finishFlag', initialValues.finishFlag);
    change('passFlag', initialValues.passFlag);
    change('resumeId', initialValues.resumeId);
    change('mode', mode);
  }

  @autobind
  handleSubmit() {
    this.props.submit();
  }

  @autobind
  handleDateChange(date) {
    const convertDate = moment(date).format('YYYY-MM-DD HH');
    console.log(convertDate);

    this.setState({ deadline: date });
    this.props.change('deadline', convertDate);
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
              <div className={scss['create__full']}>
                <p>회사명</p>
                <div className={scss['create__full--item']}>
                  <Field
                    name="companyName"
                    component="input"
                    type="text"
                    placeholder="회사명"
                  />
                  <img src={inputIcon} alt="inputIcon" />
                </div>
              </div>

              <div className={scss['create__division']}>
                <SelectCreate
                  name={'applicationYear'}
                  label={'연도'}
                  items={applicationYear}
                />
                <SelectCreate
                  name={'halfType'}
                  label={'분기'}
                  items={halfType}
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

              <div className={scss['create__full']}>
                <p>직무</p>
                <div className={scss['create__full--item']}>
                  <Field
                    name="jobType"
                    component="input"
                    type="text"
                    placeholder="직무"
                  />
                  <img src={inputIcon} alt="inputIcon" />
                </div>
              </div>

              <div className={scss['create__full']}>
                <SelectCreate
                  name={'applicationType'}
                  label={'형태'}
                  items={applicationType}
                />
              </div>

              <div className={scss['create__division']}>
                <SelectCreate
                  name={'finishFlag'}
                  label={'제출 여부'}
                  items={finishFlag}
                />
                <SelectCreate
                  name={'passFlag'}
                  label={'합격 여부'}
                  items={passFlag}
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
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
};

export default Create;
