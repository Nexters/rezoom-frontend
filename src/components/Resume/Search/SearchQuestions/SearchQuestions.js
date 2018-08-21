import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import { Route, Switch } from 'react-router-dom';
import { QuestionsList } from './QuestionsList/QuestionsList';
import scss from './SearchQuestions.scss';

@connect(
  state => ({
    searchQuestionsKeyword: state.search.searchQuestionsKeyword,
    searchQuestionsHashTag: state.search.searchQuestionsHashTag,
    searchMode: state.search.mode,
  }),
  {},
)
export class SearchQuestions extends Component {
  render() {
    const {
      searchQuestionsKeyword,
      searchQuestionsHashTag,
      searchMode,
    } = this.props;

    let listItem = [];

    if (searchMode === 'keyword') {
      listItem = searchQuestionsKeyword;
    } else {
      listItem = searchQuestionsHashTag;
    }
    return (
      <div className={scss['resumes__search']}>
        <div className={scss['resumes__contents']}>
          <QuestionsList
            searchQuestionsList={listItem}
            searchMode={searchMode}
          />
        </div>
      </div>
    );
  }
}

SearchQuestions.propTypes = {
  searchQuestionsKeyword: PropTypes.array,
  searchQuestionsHashTag: PropTypes.array,
  searchMode: PropTypes.string,
};

export default SearchQuestions;
