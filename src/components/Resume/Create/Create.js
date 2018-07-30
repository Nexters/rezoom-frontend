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
    year: 2018,
    sub: 1,
    department: 1,
    q1: 1,
    q2: 1,
    q3: 1,
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

    this.state = {
      year: [
        { key: '2010', value: 2010 },
        { key: '2011', value: 2011 },
        { key: '2012', value: 2012 },
        { key: '2013', value: 2013 },
        { key: '2014', value: 2014 },
        { key: '2015', value: 2015 },
        { key: '2016', value: 2016 },
        { key: '2017', value: 2017 },
        { key: '2018', value: 2018 },
      ],
      sub: [{ key: '상반기', value: 1 }, { key: '하반기', value: 2 }],
      department: [{ key: '영업', value: 1 }, { key: '회계', value: 2 }],
      q1: [{ key: '신입', value: 1 }, { key: '경력', value: 2 }],
      q2: [{ key: '제출', value: 1 }, { key: '미제출', value: 2 }],
      q3: [{ key: '합격', value: 1 }, { key: '불합격', value: 2 }],
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
            this.props.onDialogClose();
            this.props.submit();
          }, 1000);
        },
      );
    }
  }

  render() {
    const { dialogOpen, handleSubmit, classes } = this.props;
    const { year, sub, department, q1, q2, q3, loading } = this.state;

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
                <SelectForm name={'year'} label={'연도'} items={year} />
              </div>
              <div>
                <SelectForm name={'sub'} label={'분기'} items={sub} />
              </div>
              <div>
                <SelectForm
                  name={'department'}
                  label={'직무'}
                  items={department}
                />
              </div>
              <div>
                <SelectForm name={'q1'} label={'형태'} items={q1} />
              </div>
              <div>
                <SelectForm name={'q2'} label={'제출 여부'} items={q2} />
              </div>
              <div>
                <SelectForm name={'q3'} label={'합격 여부'} items={q3} />
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
