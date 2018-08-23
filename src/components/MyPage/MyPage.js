import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Field, getFormValues } from 'redux-form';
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
  CircularProgress,
} from '@material-ui/core';
import { getUserInfo, changePassword } from '../../store/Auth/Auth.store';
import scss from './MyPage.scss';
import autobind from 'autobind-decorator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Scrollbars from 'react-custom-scrollbars';

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
        minHeight: 218,
        borderRadius: 0,
        boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
      },
    },
    MuiPaper: {
      root: {
        width: 720,
        minHeight: 420,
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
};

@withStyles(styles)
@reduxForm({
  form: 'changePasswordForm',
  enableReinitialize: true,
  initialValues: {
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  },
  onSubmit: (values, dispatch) => {
    dispatch(changePassword(values));
  },
})
@connect(
  state => ({
    formValues: getFormValues('changePasswordForm')(state),
    loading: state.loader.container,
    userInfo: state.auth.userInfo,
    passwordChangeError: state.auth.passwordChangeError,
  }),
  {
    getUserInfo,
    submit: () => submit('changePasswordForm'),
  },
)
class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      newPasswordCheck: '',
      passwordRequired: [false, '패스워드를 입력하세요.'],
      newPasswordRequired: [false, '패스워드를 입력하세요.'],
      newPasswordCheckRequired: [false, '패스워드를 입력하세요.'],
    };
  }

  componentWillMount() {
    const { getUserInfo } = this.props;

    getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { passwordChangeError } = this.props;

    if (passwordChangeError[0] !== nextProps.passwordChangeError[0]) {
      this.setState({
        passwordRequired: nextProps.passwordChangeError,
      });
    }
  }

  @autobind
  onClickLogin(e) {
    e.stopPropagation();
    const check = this.validation();

    if (check) {
      this.props.submit();
    }
  }

  validation() {
    const { formValues } = this.props;
    const { password, newPassword, newPasswordCheck } = this.state;

    let result = true;
    const passwordRequired = formValues.password.length === 0;
    const newPasswordRequired = formValues.newPassword.length === 0;
    const newPasswordCheckRequired = formValues.newPasswordCheck.length === 0;

    if (passwordRequired || newPasswordRequired || newPasswordCheckRequired) {
      result = false;
    }

    let checkPasswordOriginAndNew = '패스워드를 입력하세요.';
    let checkPasswordBoolOriginAndNew = newPasswordRequired;
    if (password === newPassword) {
      checkPasswordOriginAndNew =
        '현재 비밀번호와 새 비밀번호는 같을 수 없습니다.';
      checkPasswordBoolOriginAndNew = true;
    }

    let checkPasswordNewAndNew = '패스워드를 입력하세요.';
    let checkPasswordBoolNewAndNew = newPasswordRequired;
    if (newPassword !== newPasswordCheck) {
      checkPasswordNewAndNew =
        '새 비밀번호와 새 비밀번호확인이 일치하지 않습니다.';
      checkPasswordBoolNewAndNew = true;
    }

    this.setState({
      passwordRequired: [passwordRequired, '패스워드를입력하세요.'],
      newPasswordRequired: [
        checkPasswordBoolOriginAndNew,
        checkPasswordOriginAndNew,
      ],
      newPasswordCheckRequired: [
        checkPasswordBoolNewAndNew,
        checkPasswordNewAndNew,
      ],
    });

    return result;
  }

  @autobind
  onChangePassword(e, value) {
    const { passwordChangeError } = this.props;
    this.setState({
      passwordRequired: [value.length === 0, '패스워드를 입력하세요.'],
      password: value,
    });
  }

  @autobind
  onChangeNewPassword(e, value) {
    this.setState({
      newPasswordRequired: [value.length === 0, '패스워드를 입력하세요.'],
      newPassword: value,
    });
  }

  @autobind
  onChangeNewPasswordCheck(e, value) {
    this.setState({
      newPasswordCheckRequired: [value.length === 0, '패스워드를 입력하세요.'],
      newPasswordCheck: value,
    });
  }

  render() {
    const { classes, loading, userInfo } = this.props;

    const {
      passwordRequired,
      newPasswordRequired,
      newPasswordCheckRequired,
    } = this.state;

    return (
      <main className={scss.mypage}>
        <Scrollbars
          autoHide
          autoHideTimeout={100}
          autoHideDuration={100}
          autoHeightMin={'100%'}
          autoHeightMax={'100%'}
          thumbMinSize={30}
          universal={true}
          className={scss.scroll}
          // style={{flex: 1, order : 2}}
        >
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
                    {userInfo}
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
                  기본 이메일로 설정하여 Rezoom의 유용한 정보와 소식을
                  받아보세요.
                </p>
              </CardContent>
            </Card>
          </MuiThemeProvider>
          <MuiThemeProvider theme={theme}>
            <Paper>
              <CardContent>
                <Typography className={classes.title}>비밀번호 변경</Typography>
                <div
                  className={scss.form}
                  style={{
                    border: passwordRequired[0] ? 'solid 1px #f1552f' : 0,
                  }}
                >
                  <div className={scss.label}>
                    <label>현재 비밀번호</label>
                  </div>
                  <Field
                    className={scss.input}
                    name="password"
                    component="input"
                    type="password"
                    onChange={this.onChangePassword}
                    placeholder="현재 비밀번호를 입력하세요."
                  />
                </div>
                {passwordRequired[0] ? (
                  <p className={scss.error__message}>{passwordRequired[1]}</p>
                ) : null}
                <div
                  className={scss.form}
                  style={{
                    border: newPasswordRequired[0] ? 'solid 1px #f1552f' : 0,
                  }}
                >
                  <div className={scss.label}>
                    <label>새 비밀번호</label>
                  </div>
                  <Field
                    className={scss.input}
                    name="newPassword"
                    component="input"
                    type="password"
                    onChange={this.onChangeNewPassword}
                    placeholder="영문, 숫자, 특수기호를 입력하세요"
                  />
                </div>
                {newPasswordRequired[0] ? (
                  <p className={scss.error__message}>
                    {newPasswordRequired[1]}
                  </p>
                ) : null}
                <div
                  className={scss.form}
                  style={{
                    border: newPasswordCheckRequired[0]
                      ? 'solid 1px #f1552f'
                      : 0,
                  }}
                >
                  <div className={scss.label}>
                    <label>비밀번호 확인</label>
                  </div>
                  <Field
                    className={scss.input}
                    name="newPasswordCheck"
                    component="input"
                    type="password"
                    onChange={this.onChangeNewPasswordCheck}
                    placeholder="영문, 숫자, 특수기호를 입력하세요"
                  />
                </div>
                {newPasswordCheckRequired[0] ? (
                  <p className={scss.error__message}>
                    {newPasswordCheckRequired[1]}
                  </p>
                ) : null}
              </CardContent>
              <CardActions>
                <Button
                  onClick={this.onClickLogin}
                  size="small"
                  type="submit"
                  variant="raised"
                >
                  비밀번호 변경
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </CardActions>
            </Paper>
          </MuiThemeProvider>
        </Scrollbars>
      </main>
    );
  }
}

MyPage.propTypes = {
  classes: PropTypes.object,
  submit: PropTypes.func,
  formValues: PropTypes.func,
  loading: PropTypes.bool,
  getUserInfo: PropTypes.func,
  passwordChangeError: PropTypes.array,
  userInfo: PropTypes.string,
};

export default MyPage;
