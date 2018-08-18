import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
} from '@material-ui/core';
import { login } from '../../store/Auth/Auth.store';
import scss from './Login.scss';
import autobind from 'autobind-decorator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        padding: '0px !important',
      },
    },
    MuiCardActions: {
      root: {
        margin: '22px 32px 22px 261px',
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
    height: 392,
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
    color: '##222222',
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
    username: '',
    password: '',
  },
  onSubmit: (values, dispatch) => {
    dispatch(login(values));
  },
})
@connect(
  state => ({
    isLogin: state.auth.isLogin,
  }),
  {
    login,
    submit: () => submit('loginForm'),
  },
)
class Login extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onClickLogin(e) {
    e.stopPropagation();
    // this.props.submit();
    this.props.login({ username: 'jaeeonjin', password: 'test' });
  }

  render() {
    const { classes, isLogin } = this.props;

    return isLogin ? (
      <Redirect push to="/resume" />
    ) : (
      <main className={scss.login}>
        <MuiThemeProvider theme={theme}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                로그인
              </Typography>
              {/* <Typography variant="headline" component="h2">
                    로그인 테스트!
                </Typography> */}
              <form>
                <div>
                  <Field
                    className={classes.input}
                    name="username"
                    component="input"
                    type="text"
                    placeholder="아이디를 입력하세요."
                  />
                </div>
                <div>
                  <Field
                    className={classes.input}
                    name="password"
                    component="input"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                  />
                </div>
              </form>
              <Typography className={classes.account} color="textSecondary">
                계정이 없으신가요?&nbsp;
                <span style={{ color: '#364eda', fontWeight: 'bold' }}>
                  회원 가입
                </span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={this.onClickLogin}
                size="small"
                type="submit"
                variant="raised"
                color="#222222"
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
};

export default Login;
