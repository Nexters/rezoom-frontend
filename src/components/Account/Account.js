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
} from '@material-ui/core';
import { userSignUp } from '../../store/Auth/Auth.store';
import scss from './Account.scss';
import autobind from 'autobind-decorator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from '../../static/images/logo/ic-logo-width.svg';
import backIcon from '../../static/images/item/back.svg';
import closeIcon from '../../static/images/item/ic-delete-cancel.svg';

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
      passwordCheckRequired: [
        false,
        '패스워드를 확인하세요.',
        '비밀번호와 비밀번호확인이 일치하지 않습니다. ',
      ],
    };
  }

  @autobind
  onClickSignUp(e) {
    e.stopPropagation();
    const { password, passwordCheck } = this.state;

    const check = this.validation();

    if (check) {
      this.props.submit();
    }
  }

  validation() {
    const { formValues } = this.props;

    let result = true;
    const nameRequired = formValues.name.length === 0;
    const usernameRequired = formValues.username.length === 0;
    const passwordRequired = formValues.password.length === 0;
    const passwordCheckRequired = formValues.passwordCheck.length === 0;

    if (
      !nameRequired ||
      !usernameRequired ||
      !passwordRequired ||
      !passwordCheckRequired
    ) {
      result = false;
    }

    this.setState({
      nameRequired: [nameRequired, '성명을 입력하세요.'],
      usernameRequired: [usernameRequired, '이메일을 입력하세요.'],
      passwordRequired: [passwordRequired, '패스워드를 입력하세요.'],
      passwordCheckRequired: [
        passwordCheckRequired,
        '패스워드를 확인하세요.',
        '비밀번호와 비밀번호확인이 일치하지 않습니다. ',
      ],
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
  onChangeUserName(e, value) {
    this.setState({
      usernameRequired: [value.length === 0, '이메일을 입력하세요.'],
    });
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
      passwordCheckRequired: [
        value.length === 0,
        '패스워드를 확인하세요.',
        '비밀번호와 비밀번호확인이 일치하지 않습니다. ',
      ],
      passwordCheck: value,
    });
  }

  render() {
    const {
      nameRequired,
      usernameRequired,
      passwordRequired,
      passwordCheckRequired,
    } = this.state;

    let buttonDisabled = false;
    if (
      nameRequired[0] ||
      usernameRequired[0] ||
      passwordRequired[0] ||
      passwordCheckRequired[0]
    ) {
      buttonDisabled = true;
    }

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
                    type="text"
                    onChange={this.onChangeUsername}
                    placeholder="이메일 주소를 입력하세요."
                  />
                </div>
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
                    placeholder="6-16자 영문, 숫자, 특수기호를 입력하세요"
                  />
                </div>
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
                    placeholder="6-16자 영문, 숫자, 특수기호를 입력하세요"
                  />
                </div>
              </form>
            </CardContent>
            <CardActions>
              <Button
                onClick={this.onClickSignUp}
                size="small"
                type="submit"
                variant="raised"
                disabled={buttonDisabled}
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

Account.propTypes = {
  submit: PropTypes.func,
  userSignUp: PropTypes.func,
  formValues: PropTypes.object,
};

export default Account;
