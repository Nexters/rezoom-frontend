import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-ui/core';
import autobind from 'autobind-decorator';
import {
  selectedQuestion,
  getQuestions,
  createQuestion,
  createQuestionOrigin,
  clearQuestion,
  selectedCreateCacheQuestion,
  deleteQuestion,
  deleteQuestionCache,
  isUpdateModeChange,
} from '../../../../store/Resume/Resume.store';
import scss from './DetailMenu.scss';
import { QuestionList } from './QuestionList/QuestionList';
import { MainButton } from '../../Button/MainButton';
import deleteIcon from '../../../../static/images/item/ic-delete.svg';
import cancelIcon from '../../../../static/images/item/ic-cancel.svg';

@connect(
  state => ({
    originQuestions: state.resume.questions,
    createCacheQuestions: state.resume.createResumeCache.detail,
    createCacheThisId: state.resume.createResumeCache.thisId,
    createCacheMode: state.resume.createResumeCache.mode,
    selectedQuestionId: state.resume.selectedQuestion,
  }),
  {
    selectedQuestion,
    getQuestions,
    createQuestion,
    createQuestionOrigin,
    clearQuestion,
    selectedCreateCacheQuestion,
    deleteQuestion,
    deleteQuestionCache,
    isUpdateModeChange,
  },
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
      init: true,
      isDeleteMode: false,
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
    this.props.clearQuestion();
  }

  componentWillReceiveProps(nextProps) {
    const {
      mode,
      originQuestions,
      createCacheQuestions,
      createCacheThisId,
      createCacheMode,
      selectedQuestionId,
    } = this.props;
    let orgData, nextData;

    if (mode === 'create') {
      orgData = createCacheQuestions;
      nextData = nextProps.createCacheQuestions;
      if (nextProps.createCacheMode === 'add') {
        if (createCacheThisId !== nextProps.createCacheThisId) {
          this.setState({
            selectedQuestion: {
              key: nextProps.createCacheThisId,
              org: nextProps.createCacheThisId,
            },
          });
        }
      }
    } else if (mode === 'detail') {
      orgData = originQuestions;
      nextData = nextProps.originQuestions;
      if (selectedQuestionId !== nextProps.selectedQuestionId) {
        this.setState({
          selectedQuestion: {
            key: nextProps.selectedQuestionId,
            org: nextProps.selectedQuestionId,
          },
        });
      }
    }

    if (orgData.length !== nextData.length) {
      let list = [];
      nextData.forEach(item => {
        list.push({
          questionId: item.questionId,
        });
      });
      this.setState({
        list: list,
      });
    }

    if (this.state.init) {
      if (nextData.length === 0) {
        this.setState({
          selectedQuestion: {
            key: 1,
            org: 1,
          },
        });

        mode === 'create'
          ? this.props.selectedCreateCacheQuestion(1, 'add')
          : this.props.selectedQuestion(1);
      } else if (nextData[0].questionId !== this.state.selectedQuestion.org) {
        this.setState({
          selectedQuestion: {
            key: 1,
            org: nextData[0].questionId,
          },
        });

        mode === 'create'
          ? this.props.selectedCreateCacheQuestion(
              nextData[0].questionId,
              'add',
            )
          : this.props.selectedQuestion(
              nextProps.originQuestions[0].questionId,
            );
      }
      this.setState({
        init: false,
      });
    }
  }

  @autobind
  onClickQuestion(id, questionId) {
    const { selectedQuestion, mode, selectedCreateCacheQuestion } = this.props;

    if (mode === 'create') {
      selectedCreateCacheQuestion(
        this.state.selectedQuestion.org,
        questionId,
        'select',
      );
    } else if (mode === 'detail') {
      selectedQuestion(questionId);
    }

    this.setState({
      selectedQuestion: {
        key: id,
        org: questionId,
      },
    });
  }

  @autobind
  onClickAddQuestion() {
    const { mode } = this.props;

    this.props.isUpdateModeChange(true);

    if (mode === 'create') {
      this.props.createQuestion();
      this.props.selectedCreateCacheQuestion(
        this.state.selectedQuestion.org,
        this.state.list.length + 1,
        'add',
      );
    } else {
      this.props.createQuestionOrigin();
    }
  }

  @autobind
  onClickDeleteChangeIcon() {
    this.setState({
      isDeleteMode: !this.state.isDeleteMode,
    });
  }

  @autobind
  deleteQuestionId(questionId) {
    const { mode } = this.props;
    this.props.isUpdateModeChange(true);
    if (mode === 'create') {
      this.props.deleteQuestionCache(questionId);
    } else {
      this.props.deleteQuestion(questionId);
    }
  }

  render() {
    const { list, selectedQuestion, isDeleteMode } = this.state;
    const { mode } = this.props;
    return (
      <div className={scss['detail__sidebar']}>
        <div className={scss['detail__sidebar--header']}>
          <p className={scss['title']}> 문항 </p>
          <IconButton
            aria-label="Delete"
            style={{ marginRight: 21 }}
            onClick={this.onClickDeleteChangeIcon}
          >
            <img src={isDeleteMode ? cancelIcon : deleteIcon} alt="closeIcon" />
          </IconButton>
        </div>
        <QuestionList
          list={list}
          selectedQuestion={selectedQuestion}
          onClickQuestion={this.onClickQuestion}
          isDeleteMode={isDeleteMode}
          deleteQuestionId={this.deleteQuestionId}
        />
        <div className={scss['detail__sidebar--button']}>
          <MainButton
            onClickButton={this.onClickAddQuestion}
            text={'문항추가'}
            type="add"
            isDisabled={false}
          />
        </div>
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
  createQuestionOrigin: PropTypes.func,
  originQuestions: PropTypes.array,
  createCacheQuestions: PropTypes.array,
  clearQuestion: PropTypes.func,
  selectedCreateCacheQuestion: PropTypes.func,
  createCacheThisId: PropTypes.number,
  createCacheMode: PropTypes.string,
  deleteQuestion: PropTypes.func,
  deleteQuestionCache: PropTypes.func,
  isUpdateModeChange: PropTypes.func,
  selectedQuestionId: PropTypes.number,
};

export default DetailMenu;
