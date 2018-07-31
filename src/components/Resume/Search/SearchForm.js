import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import scss from './Search.scss';
import autobind from 'autobind-decorator';

@withRouter
export class SearchForm extends Component {
  @autobind
  onClickSearch() {
    console.log('onClick search = ', this.props);
    const { props } = this;
    props.history.push('/resume/search');
  }

  render() {
    return (
      <div className={scss['resumes__contents--search']}>
        <Input
          type="search"
          placeholder="검색어를 입력해 주세요."
          fullWidth={true}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.onClickSearch}
        >
          검색
        </Button>
      </div>
    );
  }
}

SearchForm.proptypes = {
  history: PropTypes.router,
};

export default SearchForm;
