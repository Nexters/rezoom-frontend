import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit } from 'redux-form';
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
import { TextInput } from '../Forms';
import autobind from 'autobind-decorator';

const styles = {
  card: {
    minWidth: 275,
    width: 200,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
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
      <div className={scss.login}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              login test
            </Typography>
            {/* <Typography variant="headline" component="h2">
              로그인 테스트!
            </Typography> */}
            <form>
              <div>
                <TextInput name={'username'} label={'아이디'} />
              </div>
              <div>
                <TextInput name={'password'} label={'비밀번호'} />
              </div>
            </form>
          </CardContent>
          <CardActions>
            <Button onClick={this.onClickLogin} size="small">
              로그인
            </Button>
          </CardActions>
        </Card>
      </div>
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
