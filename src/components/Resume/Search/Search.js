import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import scss from './Search.scss';
import { List } from '../List/List';

@connect(
  state => ({
    searchResumeList: state.search.searchResumes,
  }),
  {},
)
export class Search extends Component {
  render() {
    const { searchResumeList } = this.props;
    console.log(searchResumeList);
    return (
      <div className={scss['resumes__search']}>
        <div className={scss['resumes__contents']}>
          <List resumeList={searchResumeList} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchResumeList: PropTypes.any,
};

export default Search;
