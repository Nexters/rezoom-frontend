import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Chip, Button } from '@material-ui/core';
import scss from './ResumeDetailForm.scss';
import { TextArea } from '../../Forms';
import { updateResumeDetailCache } from '../../../store/Resume/Resume.store';

@reduxForm({
  form: 'resumeDetail',
})
@connect(
  state => ({
    formValues: getFormValues('resumeDetail')(state),
  }),
  {
    updateResumeDetailCache,
  },
)
export class ResumeDetailForm extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selectedQuestion !== nextProps.selectedQuestion) {
      const { selectedQuestion, formValues } = this.props;
      console.log('formValues = ', formValues);

      this.props.updateResumeDetailCache({
        id: selectedQuestion,
        data: formValues,
      });

      return true;
    } else {
      return false;
    }
  }

  render() {
    /* 
      TODO: 

       1. 사용자가 문항을 변경하면 redux-from의 Value selector를 사용하여 resume store의 createResumeCache['detail'] 데이터에 저장 
       2. component가 mount되면 문항 순번과 createResumeCache['detail'] 의 순번이 같은 걸 resumeDetail form 에 바인딩 해준다.
    */
    return (
      <form>
        <div className={scss['detail__contents--hashtag']}>
          <Chip label="#LG" />
          <Chip label="#열정" />
          <Chip label="#가고싶은회사" />
          <Button variant="contained" color="primary">
            # 해시태그 추가
          </Button>
        </div>
        <div className={scss['detail__contents--question']}>
          <p className={scss['question__title']}>질문</p>
          <TextArea name={'question'} label={'질문'} rows={4} />
          {/* <p>
            본인의 열정에 대하여 <br /> Guide - 본인이 지원한 직무와 관련된
            지식, 경험,역량및 관심사항 등 자신을 어필할 수 있는 내용을
            구체적으로기술해주시기 바랍니다. (핵심위주로 근거에 기반하여
            간략하게 기술부탁드립니다.)
          </p> */}
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
            name={'answer'}
            label={'질문'}
            rows={4}
            className={scss['answer__contents']}
          />
          {/* <textarea className={scss['answer__contents']} /> */}
        </div>
      </form>
    );
  }
}

ResumeDetailForm.propTypes = {
  selectedQuestion: PropTypes.number.isRequired,
  formValues: PropTypes.object,
  updateResumeDetailCache: PropTypes.func,
  submit: PropTypes.func,
};
