import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import scss from './Resumes.scss';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import loadingInjector from '../../hocs/withLoading';
import { List } from './List/List';
import { getResumeList } from '../../store/Resume/Resume.store';
import { activeLoadingContainer } from '../../store/Loader/Loader.store';

@connect(
  state => ({
    resumeList: state.resume.resumes,
  }),
  {
    getResumeList,
  },
)
export class Resumes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getResumeList();
  }

  render() {
    const { resumeList } = this.props;
    return (
      <div className={scss.resumes}>
        <div className={scss['resumes__contents']}>
          <List resumeList={resumeList} />
        </div>
      </div>
    );
  }
}

Resumes.propTypes = {
  resumeList: PropTypes.any,
  getResumeList: PropTypes.func,
};

export default Resumes;
