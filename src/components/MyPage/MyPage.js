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
  Paper,
} from '@material-ui/core';
import { login } from '../../store/Auth/Auth.store';
import scss from './MyPage.scss';
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
        padding: '31px 75px 25px 488px !important',
        height: 100,
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
    MuiCard: {
      root: {
        width: 720,
        height: 218,
        borderRadius: 0,
        boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
      },
    },
    MuiPaper: {
      root: {
        width: 720,
        height: 440,
        marginBottom: 29,
      },
      elevation2: {
        boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
      },
      rounded: {
        borderRadius: 0,
      },
    },
  },
});

const styles = {
  title: {
    marginTop: 32,
    marginLeft: 72,
    marginBottom: 32,
    fontSize: 24,
    color: '#222222',
    width: 200,
  },
  titlePasswd: {
    marginTop: 32,
    marginLeft: 72,
    marginBottom: 50,
    fontSize: 24,
    color: '#222222',
    width: 200,
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
    marginBottom: 8,
    color: '#222222',
    fontSize: 14,
    border: 0,
    letterSpacing: -0.7,
  },
  label: {
    width: 117,
    height: 20,
    backgroundColor: '#ffffff',
    marginTop: 4,
    marginLeft: 72,
    color: '#5e77ff',
    fontSize: 14,
    fontWeight: 'bold',
    border: 0,
    letterSpacing: -0.7,
    display: 'inline-block',
    float: 'left',
  },
  labelPasswd: {
    width: 124,
    height: 56,
    backgroundColor: '#f7fafe',
    paddingTop: 18,
    paddingLeft: 24,
    marginTop: 8,
    marginLeft: 75,
    marginBottom: 8,
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
class MyPage extends Component {
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
      <main className={scss.mypage}>
        <MuiThemeProvider theme={theme}>
          <Card className={scss.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                계정
              </Typography>
              <span>
                <label className={classes.label}>현재 등록된 이메일</label>
                <p
                  style={{
                    color: '#668298',
                    fontSize: '14px',
                    marginLeft: '208px',
                    marginTop: '4px',
                    paddingTop: '4px',
                  }}
                >
                  6230nana@gmail.com
                </p>
              </span>
              <p />
              <p
                style={{
                  color: '#668298',
                  fontSize: '14px',
                  marginLeft: '72px',
                  marginTop: '20px',
                }}
              >
                등록된 이메일로 로그인할 수 있습니다. <br />
                기본 이메일로 설정하여 Rezoom의 유용한 정보와 소식을 받아보세요.
              </p>
            </CardContent>
          </Card>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme}>
          <Paper>
            <CardContent>
              <Typography className={classes.title}>비밀번호 변경</Typography>
              <div>
                <label className={classes.labelPasswd}>현재 비밀번호</label>
                <Field
                  className={classes.input}
                  name="password"
                  component="input"
                  type="password"
                  placeholder="6-16자 영문, 숫자, 특수기호를 입력하세요"
                />
              </div>
              <div>
                <label className={classes.labelPasswd}>새 비밀번호</label>
                <Field
                  className={classes.input}
                  name="password"
                  component="input"
                  type="password"
                  placeholder="6-16자 영문, 숫자, 특수기호를 입력하세요"
                />
              </div>
              <div>
                <label className={classes.labelPasswd}>비밀번호 확인</label>
                <Field
                  className={classes.input}
                  name="password"
                  component="input"
                  type="password"
                  placeholder="6-16자 영문, 숫자, 특수기호를 입력하세요"
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                onClick={this.onClickLogin}
                size="small"
                type="submit"
                variant="raised"
                color="#222222"
              >
                비밀번호 변경
              </Button>
            </CardActions>
          </Paper>
        </MuiThemeProvider>
      </main>
    );
  }
}

MyPage.propTypes = {
  classes: PropTypes.object,
  login: PropTypes.func,
  isLogin: PropTypes.bool,
  submit: PropTypes.func,
};

export default MyPage;
