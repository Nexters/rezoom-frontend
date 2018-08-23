import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './Layout/Layout';
import Login from './Login/Login';
import PageNotFound from './Shared/Error/PageNotFound';
import Account from './Account/Account';

import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Snackbars } from './Shared/Snackbar/Snackbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#364eda',
    },
  },
  typography: {
    fontFamily: 'Noto Sans, Roboto, Helvetica, Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
export class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={Layout} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/account" component={Account} />
              <Route path="/resume/:mode?/:id(.*)?" component={Layout} />
              <Route path="/files" component={Layout} />
              <Route path="/mypage" component={Layout} />
              <Route path="/dashboard" component={Layout} />
              <Route path="/search" component={Layout} />
              <Route component={PageNotFound} />
            </Switch>
          </ConnectedRouter>
          <Snackbars />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};

export default Root;
