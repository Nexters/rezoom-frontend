import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

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
      <ul>
        {list.map((item, idx) => {
          const index = idx + 1;
          return (
            <li
              key={idx}
              style={{
                color: selectedQuestion.key === index ? 'red' : 'black',
              }}
              // className={item.active ? scss['sidebar__active'] : ''}
              onClick={e => this.onClickQuestion(e, index, item.questionId)}
            >
              {index}
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
