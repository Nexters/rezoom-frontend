import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Sidebar } from '../Shared/Sidebar/Sidebar';
import scss from './Files.scss';
import { Card, CardContent } from '@material-ui/core';
import { changeActiveMenu } from '../../store/Sidebar/Sidebar.store';
@connect(
  state => ({
    sidebarMenus: state.sidebar.menu.files,
  }),
  {
    changeActiveMenu,
  },
)
export class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onClickMenu = this.onClickMenu.bind(this);
  }

  onClickMenu(selectedId) {
    this.props.changeActiveMenu(selectedId, 'FILES');
  }

  render() {
    const { sidebarMenus } = this.props;
    return (
      <div className={scss.files}>
        <Sidebar
          btnTitle={'자료 올리기'}
          list={sidebarMenus}
          onClickChildren={this.onClickMenu}
        />
        <div className={scss['files__contents']}>
          {/*
            <div className={scss['files__contents--title']}>
              <div className={scss['title']}>
                <p>합격한 자소서</p>
              </div>
              <div className={scss['action']}>
                <p>카드형식</p>
                <p>리스트형식</p>
              </div>
            </div>
          */}
          <div className={scss['files__contents--row']}>
            <div className={scss['files__contents--header']}>
              <div className={scss['title']}>
                <p>합격한 자소서</p>
              </div>
              <div className={scss['action']}>
                <p>카드형식</p>
                <p>리스트형식</p>
              </div>
            </div>
            <div className={scss['files__contents--list']}>
              <Card key={1} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={2} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={3} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={4} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={5} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={6} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Files.propTypes = {
  sidebarMenus: PropTypes.array,
  changeActiveMenu: PropTypes.func,
};

export default Files;
