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
  withStyles,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { login } from '../../store/Auth/Auth.store';
import scss from './Login.scss';
import autobind from 'autobind-decorator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from '../../static/images/logo/ic-logo-width.svg';

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
        margin: '22px 32px',
        padding: '0px !important',
        height: '72px',
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

const styles = {
  card: {
    width: 450,
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    borderRadius: 0,
  },
  title: {
    margin: 32,
    fontSize: 24,
    color: '#222222',
  },
  account: {
    fontSize: 14,
    textAlign: 'center',
    margin: '14px 32px',
    fontWeight: 'normal',
  },
  input: {
    width: 386,
    height: 56,
    backgroundColor: '#f7fafe',
    padding: '18px 16px',
    margin: '8px 32px',
    color: '#222222',
    fontSize: 14,
    border: 0,
    letterSpacing: -0.7,
  },
};

@withStyles(styles)
@reduxForm({
  form: 'loginForm',
  enableReinitialize: true,
  initialValues: {
    username: 'test',
    password: 'test',
  },
  onSubmit: (values, dispatch) => {
    dispatch(login(values));
  },
})
@connect(
  state => ({
    isLogin: state.auth.isLogin,
    loginError: state.auth.loginError,
    formValues: getFormValues('loginForm')(state),
  }),
  {
    login,
    submit: () => submit('loginForm'),
  },
)
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameRequired: [false, '이메일을 입력하세요.'],
      passwordRequired: [false, '패스워드를 입력하세요.'],
      loginErrorThrow: [false, ''],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loginError } = this.props;

    if (loginError[0] !== nextProps.loginError[0]) {
      this.setState({
        loginErrorThrow: nextProps.loginError,
      });
    }
  }

  @autobind
  onClickLogin(e) {
    e.stopPropagation();

    this.props.submit();
    // const check = this.validation();

    // if (check) {
    //   this.props.submit();
    // }
  }

  @autobind
  onKeyPress(e) {
    if (e.hasOwnProperty('key')) {
      if (e.key === 'Enter') {
        const check = this.validation();

        if (check) {
          this.props.submit();
        }
      }
    }
  }

  validation() {
    const { formValues } = this.props;

    let result = true;
    const usernameRequired = formValues.username.length === 0;
    const passwordRequired = formValues.password.length === 0;

    if (usernameRequired || passwordRequired) {
      result = false;
    }

    let checkEmail = '이메일을 입력하세요.';
    let checkBool = usernameRequired;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!regex.test(formValues.username)) {
      checkEmail = '올바른 형태의 이메일이 아닙니다.';
      checkBool = true;
      result = false;
    }

    this.setState({
      usernameRequired: [checkBool, checkEmail],
      passwordRequired: [passwordRequired, '패스워드를 입력하세요.'],
    });

    return result;
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
    const { loginErrorThrow } = this.state;

    this.setState({
      passwordRequired: [value.length === 0, '패스워드를 입력하세요.'],
      password: value,
    });
  }

  render() {
    const { classes, isLogin } = this.props;
    const { usernameRequired, passwordRequired, loginErrorThrow } = this.state;

    return isLogin ? (
      <Redirect push to="/resume" />
    ) : (
      <main className={scss.login}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="absolute" color="inherit">
            <Toolbar>
              <img src={logo} alt="rezoom-logo" />
            </Toolbar>
          </AppBar>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                로그인
              </Typography>
              <form>
                <div>
                  <Field
                    style={{
                      border: usernameRequired[0] ? 'solid 1px #f1552f' : 0,
                    }}
                    className={classes.input}
                    name="username"
                    component="input"
                    type="text"
                    placeholder="이메일 주소를 입력하세요."
                    onChange={this.onChangeEmail}
                  />
                </div>
                {usernameRequired[0] ? (
                  <p className={scss.error__message}> {usernameRequired[1]} </p>
                ) : null}
                <div>
                  <Field
                    style={{
                      border: passwordRequired[0] ? 'solid 1px #f1552f' : 0,
                    }}
                    className={classes.input}
                    name="password"
                    component="input"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={this.onChangePassword}
                    onKeyPress={e => this.onKeyPress(e)}
                  />
                </div>
                {passwordRequired[0] ? (
                  <p className={scss.error__message}> {passwordRequired[1]} </p>
                ) : null}
              </form>
              <Typography className={classes.account} color="textSecondary">
                계정이 없으신가요 ?
                <span
                  style={{
                    color: '#364eda',
                    fontWeight: 'bold',
                  }}
                >
                  <Link to="/account"> 회원 가입 </Link>
                </span>
              </Typography>
            </CardContent>
            <CardActions>
              <p className={scss.error__message}>
                {loginErrorThrow[0] ? loginErrorThrow[1] : null}
              </p>

              <Button
                onClick={this.onClickLogin}
                size="small"
                type="submit"
                variant="raised"
              >
                로그인
              </Button>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  login: PropTypes.func,
  isLogin: PropTypes.bool,
  submit: PropTypes.func,
  formValues: PropTypes.object,
  loginError: PropTypes.array,
};

export default Login;
