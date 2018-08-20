import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import Header from '../Shared/Header/Header';
import MyPage from '../MyPage/MyPage';
import withAuthGuard from '../../hocs/withAuthGuard';
import scss from './Layout.scss';
import { Files } from '../File/Files';
import { ResumeDetail, Resumes } from '../Resume';
import { Create } from '../Dialog/Create/Create';
import autobind from 'autobind-decorator';
import { Dialog } from '../Dialog/Dialog';
import { SearchForm } from '../Resume/Search/SearchForm';
import { Search } from '../Resume/Search/Search';
import { LoaderContainer } from '../Shared';
import { SearchQuestions } from '../Resume/Search/SearchQuestions/SearchQuestions';

@connect(
  state => ({
    isLogin: state.auth.isLogin,
  }),
  {},
)
@withAuthGuard()
export class Layout extends Component {
  render() {
    const { isLogin, match } = this.props;
    return (
      <div className={scss['rezoom__container']}>
        <Header />
        <div className={scss['rezoom__contents']}>
          <LoaderContainer />
          {match.params.mode === undefined ? <SearchForm /> : null}
          <Switch>
            <Route exact path="/resume" component={Resumes} />
            <Route
              exact
              path="/resume/:mode?/:id(.*)?"
              component={ResumeDetail}
            />
            <Route path="/files" component={Files} />
            <Route exact path="/search/resumes" component={Search} />
            <Route exact path="/search/questions" component={SearchQuestions} />
            <Route path="/mypage/:type?" component={MyPage} />
          </Switch>
        </div>
        <Dialog />
      </div>
    );
  }
}

Layout.propTypes = {
  isLogin: PropTypes.bool,
  match: PropTypes.obejct,
};

export default Layout;
