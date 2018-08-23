import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import scss from './Files.scss';
import { Card, CardContent } from '@material-ui/core';
import commingSoon from '../../static/images/item/stack-documents.svg';
import { inactiveLoadingContainer } from '../../store/Loader/Loader.store';

@connect(
  state => ({
    sidebarMenus: state.sidebar.menu.files,
  }),
  {
    inactiveLoadingContainer,
  },
)
export class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.inactiveLoadingContainer();
  }

  render() {
    return (
      <div className={scss.files}>
        <img src={commingSoon} alt="cooming soon" />
        <p>Comming Soon</p>
        {/* <div className={scss['files__contents']}>
          <div className={scss['files__contents--row']}>
            <div className={scss['files__contents--header']}>
              <div className={scss['title']}>
                <p />
              </div>
              <div className={scss['action']}>
                <p />
                <p />
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
        </div> */}
      </div>
    );
  }
}

Files.propTypes = {
  inactiveLoadingContainer: PropTypes.func,
};

export default Files;
