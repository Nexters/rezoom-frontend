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

const styles = {
  card: {
    width: 720,
    height: 488,
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    borderRadius: 0,
  },
  title: {
    margin: '32px 559px 32px 72px',
    fontSize: 24,
    color: '#222222',
    width: 100,
  },
  account: {
    fontSize: 14,
    textAlign: 'center',
    margin: '14px 32px',
    fontWeight: 'normal',
  },
  input: {
    width: 446,
    height: 56,
    backgroundColor: '#f7fafe',
    padding: '24px 18px',
    marginTop: 8,
    color: '#222222',
    fontSize: 14,
    border: 0,
    letterSpacing: -0.7,
  },
  label: {
    width: 124,
    height: 56,
    backgroundColor: '#f7fafe',
    paddingTop: 18,
    paddingLeft: 24,
    marginTop: 8,
    marginLeft: 75,
    color: '#5e77ff',
    fontSize: 14,
    fontWeight: 'bold',
    border: 0,
    letterSpacing: -0.7,
    display: 'inline-block',
    float: 'left',
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
      <main className={scss.account}>
        <MuiThemeProvider theme={theme}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                회원가입
              </Typography>
              {/* <Typography variant="headline" component="h2">
                    로그인 테스트!
                </Typography> */}
              <form>
                <div>
                  <span>
                    <label className={classes.label}>성명</label>
                    <Field
                      className={classes.input}
                      name="username"
                      component="input"
                      type="text"
                      placeholder="아이디를 입력하세요."
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label className={classes.label}>이메일</label>
                    <Field
                      className={classes.input}
                      name="password"
                      component="input"
                      type="text"
                      placeholder="이메일 주소를 입력하세요."
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label className={classes.label}>비밀번호</label>
                    <Field
                      className={classes.input}
                      name="password"
                      component="input"
                      type="password"
                      placeholder="6-16자 영문, 숫자, 특수기호를 입력하세요"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label className={classes.label}>비밀번호 확인</label>
                    <Field
                      className={classes.input}
                      name="password"
                      component="input"
                      type="password"
                      placeholder="6-16자 영문, 숫자, 특수기호를 입력하세요"
                    />
                  </span>
                </div>
              </form>
            </CardContent>
            <CardActions>
              <Button
                onClick={this.onClickLogin}
                size="small"
                type="submit"
                variant="raised"
                color="#222222"
              >
                가입완료
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
