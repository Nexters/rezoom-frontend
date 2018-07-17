import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
@connect(
  state => ({
    isLogin: state.auth.isLogin,
  }),
  {
    login,
  },
)
class Login extends Component {
  constructor(props) {
    super(props);
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
            <Typography variant="headline" component="h2">
              로그인 테스트!
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.props.login} size="small">
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
};

export default Login;
