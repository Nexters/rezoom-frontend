import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import {
  selectedQuestion,
  getQuestions,
} from '../../../../store/Resume/Resume.store';
import scss from './DetailMenu.scss';

@connect(
  state => ({}),
  { selectedQuestion, getQuestions },
)
export class DetailMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [1, 2, 3],
      selectedQuestion: 1,
    };
    console.log('디테일 메뉴');
  }

  componentDidMount() {
    const { resumeId, mode, getQuestions } = this.props;

    if (mode === 'create') {
    } else if (mode === 'detail') {
      getQuestions(resumeId);
    }
  }

  @autobind
  onClickQuestion(e, id) {
    e.stopPropagation();
    const { selectedQuestion } = this.props;
    // console.log('onClickQuestion ! ', id);
    this.setState({
      selectedQuestion: id,
    });
    selectedQuestion(id);
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
          {list.map(item => {
            // console.log(item);
            return (
              <li
                key={item}
                style={{ color: selectedQuestion === item ? 'red' : 'black' }}
                // className={item.active ? scss['sidebar__active'] : ''}
                onClick={e => this.onClickQuestion(e, item)}
              >
                {item}
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
};

export default DetailMenu;
