import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import {
  selectedQuestion,
  getQuestions,
  createQuestion,
  clearQuestion,
} from '../../../../store/Resume/Resume.store';
import scss from './DetailMenu.scss';

@connect(
  state => ({
    originQuestions: state.resume.questions,
    createCacheQuestions: state.resume.createResumeCache.detail,
  }),
  { selectedQuestion, getQuestions, createQuestion, clearQuestion },
)
export class DetailMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      selectedQuestion: {
        key: 1,
        org: 1,
      },
    };
  }

  componentDidMount() {
    const { resumeId, mode, getQuestions, createQuestion } = this.props;

    if (mode === 'create') {
      createQuestion();
    } else if (mode === 'detail') {
      getQuestions(resumeId);
    }
  }

  componentWillUnmount() {
    console.log('unmount detailMenu');
    this.props.clearQuestion();
  }

  componentWillReceiveProps(nextProps) {
    const { mode, originQuestions, createCacheQuestions } = this.props;

    if (mode === 'create') {
      console.log(
        'createCacheQuestions.length = ',
        createCacheQuestions.length,
      );
      console.log(
        'nextProps.createCacheQuestions.length = ',
        nextProps.createCacheQuestions.length,
      );
    } else if (mode === 'detail') {
      console.log('originQuestions = ', originQuestions);
      console.log('nextProps.originQuestions = ', nextProps.originQuestions);
      if (originQuestions.length !== nextProps.originQuestions.length) {
        let list = [];
        nextProps.originQuestions.forEach(item => {
          list.push({ questionId: item.questionId });
        });
        this.setState({
          list: list,
        });
      }
      if (
        nextProps.originQuestions[0].questionId !==
        this.state.selectedQuestion.org
      ) {
        this.setState({
          selectedQuestion: {
            key: 1,
            org: nextProps.originQuestions[0].questionId,
          },
        });
        this.props.selectedQuestion(nextProps.originQuestions[0].questionId);
      }
    }
  }

  @autobind
  onClickQuestion(e, id, questionId) {
    e.stopPropagation();
    const { selectedQuestion } = this.props;
    // console.log('onClickQuestion ! ', id);
    this.setState({
      selectedQuestion: { key: id, org: questionId },
    });
    selectedQuestion(questionId);
  }

  @autobind
  onClickAddQuestion() {
    this.props.createQuestion();
  }

  @autobind
  onClickDeleteQuestion() {}

  render() {
    const { list, selectedQuestion } = this.state;
    return (
      <div className={scss['detail__sidebar']}>
        <div className={scss['detail__sidebar--header']}>
          <p>문항</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.onClickDeleteQuestion}
          >
            삭제
          </Button>
        </div>
        <ul>
          {list.map((item, idx) => {
            const index = idx + 1;
            // console.log(item);
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
        <Button
          variant="outlined"
          color="primary"
          onClick={this.onClickAddQuestion}
        >
          + 문항추가
        </Button>
      </div>
    );
  }
}

DetailMenu.propTypes = {
  selectedQuestion: PropTypes.func,
  resumeId: PropTypes.string,
  mode: PropTypes.string,
  getQuestions: PropTypes.func,
  createQuestion: PropTypes.func,
  originQuestions: PropTypes.array,
  createCacheQuestions: PropTypes.array,
  clearQuestion: PropTypes.func,
};

export default DetailMenu;
