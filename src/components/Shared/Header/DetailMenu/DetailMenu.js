import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import {
  selectedQuestion,
  getQuestions,
  createQuestion,
} from '../../../../store/Resume/Resume.store';
import scss from './DetailMenu.scss';

@connect(
  state => ({
    originQuestions: state.resume.questions,
    createCacheQuestions: state.resume.createResumeCache.detail,
  }),
  { selectedQuestion, getQuestions, createQuestion },
)
export class DetailMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      selectedQuestion: 1,
    };
    console.log('디테일 메뉴');
  }

  componentDidMount() {
    const { resumeId, mode, getQuestions, createQuestion } = this.props;

    if (mode === 'create') {
      createQuestion();
    } else if (mode === 'detail') {
      getQuestions(resumeId);
    }
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
      if (originQuestions.length !== nextProps.originQuestions) {
        let list = [];
        nextProps.originQuestions.forEach(item => {
          list.push({ questionsId: item.questionsId });
        });
        this.setState({
          list: list,
        });
      }
    }
  }

  @autobind
  onClickQuestion(e, id, questionId) {
    e.stopPropagation();
    const { selectedQuestion } = this.props;
    // console.log('onClickQuestion ! ', id);
    this.setState({
      selectedQuestion: id,
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
                style={{ color: selectedQuestion === index ? 'red' : 'black' }}
                // className={item.active ? scss['sidebar__active'] : ''}
                onClick={e => this.onClickQuestion(e, index, item.questionsId)}
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
  resumeId: PropTypes.number,
  mode: PropTypes.string,
  getQuestions: PropTypes.func,
  createQuestion: PropTypes.func,
  originQuestions: PropTypes.array,
  createCacheQuestions: PropTypes.array,
};

export default DetailMenu;
