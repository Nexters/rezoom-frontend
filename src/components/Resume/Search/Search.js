import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import scss from './Search.scss';

export class Search extends Component {
  render() {
    return (
      <div className={scss['resumes__search']}>
        <h1>search!</h1>
      </div>
    );
  }
}

export default Search;
