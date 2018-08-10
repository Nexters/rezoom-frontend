import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues, change } from 'redux-form';
import { Chip, Button } from '@material-ui/core';
import scss from './ResumeDetailForm.scss';
import { TextArea } from '../../Forms';
import { updateResumeDetailCache } from '../../../store/Resume/Resume.store';
import { HashTag } from '../../Forms/hashTag';

@reduxForm({
  form: 'resumeDetail',
})
@connect(
  state => ({
    formValues: getFormValues('resumeDetail')(state),
    originQuestionId: state.resume.selectedQuestion,
    originQuestions: state.resume.questions,
    createCacheQuestions: state.resume.createResumeCache.detail,
  }),
  {
    updateResumeDetailCache,
    change: (key, value) => change('resumeDetail', key, value),
  },
)
export class ResumeDetailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { mode, originQuestionId, originQuestions, change } = this.props;

    if (mode === 'create') {
      if (this.props.originQuestionId !== nextProps.originQuestionId) {
        const { formValues } = this.props;

        this.props.updateResumeDetailCache({
          id: questionId,
          data: formValues,
        });

        return true;
      } else {
        return false;
      }
    } else if (mode === 'detail') {
      if (originQuestionId !== nextProps.originQuestionId) {
        nextProps.originQuestions.forEach(item => {
          if (item.questionId === nextProps.originQuestionId) {
            change('content', item.content);
            change('title', item.title);
            if (item.hashTags.length > 0) {
              const tags = item.hashTags.join();
              change('hashTags', tags);
              this.setState({
                tags: item.hashTags,
              });
            } else {
              change('hashTags', '');
            }
          }
        });
      }
    }
  }

  render() {
    const { tags } = this.state;
    /* 
      TODO: 

       1. 사용자가 문항을 변경하면 redux-from의 Value selector를 사용하여 resume store의 createResumeCache['detail'] 데이터에 저장 
       2. component가 mount되면 문항 순번과 createResumeCache['detail'] 의 순번이 같은 걸 resumeDetail form 에 바인딩 해준다.
    */
    return (
      <form>
        <div className={scss['detail__contents--hashtag']}>
          <HashTag name={'hashTags'} label={'해시태그'} tags={tags} />
          <Button variant="contained" color="primary">
            # 해시태그 추가
          </Button>
        </div>
        <div className={scss['detail__contents--question']}>
          <p className={scss['question__title']}>질문</p>
          <TextArea name={'title'} label={'질문'} rows={4} />
        </div>
        <div className={scss['detail__contents--answer']}>
          <div className={scss['answer__header']}>
            <p>답변</p>
            <div className={scss['answer__header--action']}>
              <p>800 / 1000자</p>
              <Button variant="contained" color="primary">
                설정
              </Button>
            </div>
          </div>
          <TextArea
            name={'content'}
            label={'질문'}
            rows={4}
            className={scss['answer__contents']}
          />
        </div>
      </form>
    );
  }
}

ResumeDetailForm.propTypes = {
  formValues: PropTypes.object,
  updateResumeDetailCache: PropTypes.func,
  submit: PropTypes.func,
  mode: PropTypes.string,
  originQuestionId: PropTypes.number,
  originQuestions: PropTypes.array,
  change: PropTypes.func,
};
