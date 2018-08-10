import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import scss from './Resumes.scss';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import loadingInjector from '../../hocs/withLoading';
import { List } from './List/List';

// @loadingInjector(true)
export class Resumes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={scss.resumes}>
        <div className={scss['resumes__contents']}>
          <div className={scss['resumes__contents--header']}>
            <div className={scss['title']}>
              <p>합격한 자소서</p>
            </div>
            <div className={scss['action']}>
              <p>카드형식</p>
              <p>리스트형식</p>
            </div>
          </div>
          <List />
        </div>
      </div>
    );
  }
}

Resumes.propTypes = {};

export default Resumes;
