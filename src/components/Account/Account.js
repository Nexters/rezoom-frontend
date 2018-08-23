import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Field, getFormValues } from 'redux-form';
import { Redirect, Link } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import { userSignUp } from '../../store/Auth/Auth.store';
import scss from './Account.scss';
import autobind from 'autobind-decorator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from '../../static/images/logo/ic-logo-width.svg';
import backIcon from '../../static/images/item/back.svg';
import closeIcon from '../../static/images/item/ic-delete-cancel.svg';
import { Snackbars } from '../Shared/Snackbar/Snackbar';

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      elevation4: {
        boxShadow: 'none',
      },
    },
    MuiCardContent: {
      root: {
        padding: '0px !important',
      },
    },
    MuiCardActions: {
      root: {
        margin: '19px 75px 25px 488px',
        padding: '0px !important',
        height: '100px',
      },
      action: {
        margin: '0px',
      },
    },
    MuiButton: {
      root: {
        backgroundColor: '#364eda !important',
        color: '#ffffff !important',
        height: '56px',
        width: '157px',
        borderRadius: 28,
        fontSize: '14px !important',
        fontWeight: 'bold',
        boxShadow: '0 2px 6px 0 rgba(159, 159, 159, 0.5)',
      },
    },
  },
});

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
  form: 'accountForm',
  enableReinitialize: true,
  initialValues: {
    name: '',
    username: '',
    password: '',
    passwordCheck: '',
  },
  onSubmit: (values, dispatch) => {
    dispatch(userSignUp(values));
  },
})
@connect(
  state => ({
    formValues: getFormValues('accountForm')(state),
    loading: state.loader.component,
    duplicate: state.auth.duplicate,
  }),
  {
    submit: () => submit('accountForm'),
  },
)
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordCheck: '',
      nameRequired: [false, '성명을 입력하세요.'],
      usernameRequired: [false, '이메일을 입력하세요.'],
      passwordRequired: [false, '패스워드를 입력하세요.'],
      passwordCheckRequired: [false, '패스워드를 확인하세요.'],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { duplicate } = this.props;

    if (duplicate[0] !== nextProps.duplicate[0]) {
      this.setState({
        usernameRequired: nextProps.duplicate,
      });
    }
  }

  @autobind
  onClickSignUp(e) {
    e.stopPropagation();

    const check = this.validation();

    if (check) {
      this.props.submit();
    }
  }

  validation() {
    const { formValues } = this.props;
    const { password, passwordCheck } = this.state;

    let result = true;
    const nameRequired = formValues.name.length === 0;
    const usernameRequired = formValues.username.length === 0;
    const passwordRequired = formValues.password.length === 0;
    const passwordCheckRequired = formValues.passwordCheck.length === 0;

    if (
      nameRequired ||
      usernameRequired ||
      passwordRequired ||
      passwordCheckRequired
    ) {
      result = false;
    }

    let checkEmail = '이메일을 입력하세요.';
    let checkBool = usernameRequired;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!regex.test(formValues.username)) {
      checkEmail = '올바른 형태의 이메일이 아닙니다.';
      checkBool = true;
    }

    let checkPassword = '패스워드를 입력하세요.';
    let checkPasswordBool = passwordCheckRequired;
    if (password !== passwordCheck) {
      checkPassword = '비밀번호와 비밀번호확인이 일치하지 않습니다. ';
      checkPasswordBool = true;
    }

    this.setState({
      nameRequired: [nameRequired, '성명을 입력하세요.'],
      usernameRequired: [checkBool, checkEmail],
      passwordRequired: [passwordRequired, '패스워드를 입력하세요.'],
      passwordCheckRequired: [checkPasswordBool, checkPassword],
    });

    return result;
  }

  @autobind
  onChangeName(e, value) {
    this.setState({
      nameRequired: [value.length === 0, '성명을 입력하세요.'],
    });
  }

  @autobind
  onChangeEmail(e, value) {
    const { usernameRequired } = this.state;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    let checkEmail = '이메일을 입력하세요.';
    let checkBool = usernameRequired;

    if (usernameRequired[0]) {
      if (!regex.test(value)) {
        checkEmail = '올바른 형태의 이메일이 아닙니다.';
        checkBool = true;
      }
      this.setState({
        usernameRequired: [checkBool === 0, checkEmail],
      });
    } else {
      this.setState({
        usernameRequired: [value.length === 0, '이메일을 입력하세요.'],
      });
    }
  }

  @autobind
  onChangePassword(e, value) {
    this.setState({
      passwordRequired: [value.length === 0, '패스워드를 입력하세요.'],
      password: value,
    });
  }

  @autobind
  onChangePasswordCheck(e, value) {
    this.setState({
      passwordCheckRequired: [value.length === 0, '패스워드를 입력하세요.'],
      passwordCheck: value,
    });
  }

  render() {
    const { loading, classes } = this.props;
    const {
      nameRequired,
      usernameRequired,
      passwordRequired,
      passwordCheckRequired,
    } = this.state;

    return (
      <main className={scss.account}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="absolute" color="inherit">
            <Toolbar>
              <img src={logo} alt="rezoom-logo" />
            </Toolbar>
          </AppBar>
          <Card className={scss.card}>
            <CardContent>
              <div className={scss.titlebox}>
                <Typography className={scss.title} color="textSecondary">
                  <IconButton aria-label="back" style={{ marginRight: 12 }}>
                    <Link to="/login">
                      <img src={backIcon} alt="rezoom-logo" />
                    </Link>
                  </IconButton>
                  회원가입
                </Typography>
                <IconButton aria-label="close">
                  <Link to="/login">
                    <img src={closeIcon} alt="closeIcon" />
                  </Link>
                </IconButton>
              </div>
              {/* <Typography variant="headline" component="h2">
                    로그인 테스트!
                </Typography> */}
              <form>
                <div
                  className={scss.form}
                  style={{ border: nameRequired[0] ? 'solid 1px #f1552f' : 0 }}
                >
                  <div className={scss.label}>
                    <label>성명</label>
                  </div>
                  <Field
                    className={scss.input}
                    name="name"
                    component="input"
                    type="text"
                    onChange={this.onChangeName}
                    placeholder="성명을 입력하세요."
                  />
                </div>
                {nameRequired[0] ? (
                  <p className={scss.error__message}>{nameRequired[1]}</p>
                ) : null}
                <div
                  className={scss.form}
                  style={{
                    border: usernameRequired[0] ? 'solid 1px #f1552f' : 0,
                  }}
                >
                  <div className={scss.label}>
                    <label>이메일</label>
                  </div>
                  <Field
                    className={scss.input}
                    name="username"
                    component="input"
                    type="email"
                    onChange={this.onChangeEmail}
                    placeholder="이메일 주소를 입력하세요."
                  />
                </div>
                {usernameRequired[0] ? (
                  <p className={scss.error__message}>{usernameRequired[1]}</p>
                ) : null}
                <div
                  className={scss.form}
                  style={{
                    border: passwordRequired[0] ? 'solid 1px #f1552f' : 0,
                  }}
                >
                  <div className={scss.label}>
                    <label>비밀번호</label>
                  </div>
                  <Field
                    className={scss.input}
                    name="password"
                    component="input"
                    type="password"
                    onChange={this.onChangePassword}
                    placeholder="영문, 숫자, 특수기호를 입력하세요"
                  />
                </div>
                {passwordRequired[0] ? (
                  <p className={scss.error__message}>{passwordRequired[1]}</p>
                ) : null}
                <div
                  className={scss.form}
                  style={{
                    border: passwordCheckRequired[0] ? 'solid 1px #f1552f' : 0,
                  }}
                >
                  <div className={scss.label}>
                    <label>비밀번호 확인</label>
                  </div>
                  <Field
                    className={scss.input}
                    name="passwordCheck"
                    component="input"
                    type="password"
                    onChange={this.onChangePasswordCheck}
                    placeholder="영문, 숫자, 특수기호를 입력하세요"
                  />
                </div>
                {passwordCheckRequired[0] ? (
                  <p className={scss.error__message}>
                    {passwordCheckRequired[1]}
                  </p>
                ) : null}
              </form>
            </CardContent>
            <CardActions>
              <div className={classes.wrapper}>
                <Button
                  onClick={this.onClickSignUp}
                  size="small"
                  type="submit"
                  variant="raised"
                  disabled={false}
                >
                  가입완료
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </main>
    );
  }
}

Account.propTypes = {
  submit: PropTypes.func,
  userSignUp: PropTypes.func,
  formValues: PropTypes.object,
  loading: PropTypes.bool,
  classes: PropTypes.object,
  duplicate: PropTypes.array,
};

export default Account;
