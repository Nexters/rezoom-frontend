import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import connect from 'redux-connect-decorator';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import scss from './Resumes.scss';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import loadingInjector from '../../hocs/withLoading';
import { Sidebar } from '../Shared/Sidebar/Sidebar';
import { changeActiveMenu } from '../../store/Sidebar/Sidebar.store';
import { SearchForm } from './Search/SearchForm';
import { List } from './List/List';
import { Search } from './Search/Search';

@connect(
  state => ({
    sidebarMenus: state.sidebar.menu.resume,
  }),
  {
    changeActiveMenu,
  },
)
@loadingInjector(true)
export class Resumes extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onClickMenu(selectedId) {
    this.props.changeActiveMenu(selectedId, 'RESUME');
  }

  render() {
    const { sidebarMenus, match } = this.props;

    let renderMatchedComponent;

    if (match['params']['mode'] === undefined) {
      renderMatchedComponent = <List />;
    } else if (match['params']['mode'] === 'search') {
      renderMatchedComponent = <Search />;
    }

    return (
      <div className={scss.resumes}>
        {/* 
          <Sidebar
            btnTitle={'자소서 작성'}
            list={sidebarMenus}
            onClickMenu={this.onClickMenu}
            onClickButton={this.onClickButton}
          />
         */}
        <div className={scss['resumes__contents']}>
          <SearchForm />
          <div className={scss['resumes__contents--header']}>
            <div className={scss['title']}>
              <p>합격한 자소서</p>
            </div>
            <div className={scss['action']}>
              <p>카드형식</p>
              <p>리스트형식</p>
            </div>
          </div>
          {renderMatchedComponent}
        </div>
      </div>
    );
  }
}

Resumes.propTypes = {
  sidebarMenus: PropTypes.array,
  changeActiveMenu: PropTypes.func,
  match: PropTypes.object,
};

export default Resumes;
