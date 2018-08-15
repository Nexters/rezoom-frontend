import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import scss from './QuestionList.scss';

export class QuestionList extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onClickQuestion(e, id, questionId) {
    e.stopPropagation();
    this.props.onClickQuestion(id, questionId);
  }

  render() {
    const { list, selectedQuestion } = this.props;

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
};

export default QuestionList;
