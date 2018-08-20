import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reduxForm, submit, change } from 'redux-form';
import { TextInput, SelectForm } from '../../Forms';
import { createNewResume } from '../../../store/Resume/Resume.store';
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
    halfType: 1,
    jobType: '',
    applicationType: 1,
    finishFlag: 1,
    passFlag: 1,
    time: new Date(),
  },
  onSubmit: (values, dispatch) => {
    dispatch(createNewResume(values));
  },
})
@connect(
  state => ({}),
  {
    submit: () => submit('newResume'),
    change: (key, value) => change('newResume', key, value),
  },
)
export class Create extends Component {
  timer = null;

  constructor(props) {
    super(props);

    const {
      applicationYear,
      halfType,
      jobType,
      applicationType,
      finishFlag,
      passFlag,
    } = resumeCreateFormData;

    this.state = {
      applicationYear,
      halfType,
      jobType,
      applicationType,
      finishFlag,
      passFlag,
      selectedDate: new Date(),
      loading: false,
    };
  }

  @autobind
  handleSubmit() {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
            this.props.submit();
            this.props.onDialogClose();
          }, 1000);
        },
      );
    }
  }

  @autobind
  handleDateChange(date) {
    const convertDate = moment(date).toObject();
    console.log(convertDate);

    this.setState({ selectedDate: date });
    this.props.change('time', date);
  }

  render() {
    const { dialogOpen, handleSubmit, classes } = this.props;
    const {
      applicationYear,
      halfType,
      jobType,
      applicationType,
      finishFlag,
      passFlag,
      loading,
      selectedDate,
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
                    name="time"
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
                      value={selectedDate}
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
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={this.handleSubmit}
              >
                다음
              </Button>
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
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
};

export default Create;
