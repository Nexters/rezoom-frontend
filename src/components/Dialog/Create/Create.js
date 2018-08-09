import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reduxForm, fieldInputPropTypes, submit } from 'redux-form';
import { TextInput, SelectForm } from '../../Forms';
import { createNewResume } from '../../../store/Resume/Resume.store';
import autobind from 'autobind-decorator';
import { withStyles, CircularProgress } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { resumeCreateFormData } from '../../../utils/Constans';

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
    jobType: 1,
    applicationType: 1,
    finishFlag: 1,
    passFlag: 1,
  },
  onSubmit: (values, dispatch) => {
    dispatch(createNewResume(values));
  },
})
@connect(
  state => ({}),
  {
    submit: () => submit('newResume'),
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
    } = this.state;

    return (
      <div>
        <Dialog open={dialogOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">자소서 작성</DialogTitle>
          <DialogContent>
            <form>
              <div>
                <TextInput name={'companyName'} label={'회사명'} />
              </div>
              <div>
                <SelectForm
                  name={'applicationYear'}
                  label={'연도'}
                  items={applicationYear}
                />
              </div>
              <div>
                <SelectForm name={'halfType'} label={'분기'} items={halfType} />
              </div>
              <div>
                <SelectForm name={'jobType'} label={'직무'} items={jobType} />
              </div>
              <div>
                <SelectForm
                  name={'applicationType'}
                  label={'형태'}
                  items={applicationType}
                />
              </div>
              <div>
                <SelectForm
                  name={'finishFlag'}
                  label={'제출 여부'}
                  items={finishFlag}
                />
              </div>
              <div>
                <SelectForm
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
};

export default Create;
