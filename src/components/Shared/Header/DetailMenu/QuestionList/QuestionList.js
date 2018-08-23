import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import scss from './QuestionList.scss';
import { IconButton } from '@material-ui/core';
import deleteIcon from '../../../../../static/images/item/ic-delete.svg';

export class QuestionList extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onClickQuestion(e, id, questionId) {
    e.stopPropagation();
    this.props.onClickQuestion(id, questionId);
  }

  @autobind
  deleteQuestions(e, questionId) {
    e.stopPropagation();
    this.props.deleteQuestionId(questionId);
  }

  render() {
    const { list, selectedQuestion, isDeleteMode } = this.props;

    return (
      <ul className={scss['question__list']}>
        {list.map((item, idx) => {
          const index = idx + 1;
          return (
            <li
              key={idx}
              className={
                selectedQuestion.key === index
                  ? scss['question__list--item--active']
                  : scss['question__list--item']
              }
              onClick={e => this.onClickQuestion(e, index, item.questionId)}
            >
              <p>문항 {index}</p>
              {isDeleteMode ? (
                <IconButton
                  aria-label="Delete"
                  onClick={e => this.deleteQuestions(e, item.questionId)}
                >
                  <img src={deleteIcon} alt="closeIcon" />
                </IconButton>
              ) : null}
            </li>
          );
        })}
      </ul>
    );
  }
}

QuestionList.propTypes = {
  onClickQuestion: PropTypes.func,
  selectedQuestion: PropTypes.object,
  list: PropTypes.array,
  isDeleteMode: PropTypes.bool,
  deleteQuestionId: PropTypes.func,
};

export default QuestionList;
