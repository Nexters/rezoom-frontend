import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues, change } from 'redux-form';
import {
  Chip,
  Button,
  Popper,
  Fade,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import scss from './ResumeDetailForm.scss';
import { TextArea } from '../../Forms';
import { updateResumeDetailCache } from '../../../store/Resume/Resume.store';
import { HashTag } from '../../Forms/hashTag';
import autobind from 'autobind-decorator';

@reduxForm({
  form: 'resumeDetail',
})
@connect(
  state => ({
    formValues: getFormValues('resumeDetail')(state),
    originQuestionId: state.resume.selectedQuestion,
    originQuestions: state.resume.questions,
    createCacheQuestions: state.resume.createResumeCache,
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
      open: false,
      anchorEl: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      mode,
      originQuestionId,
      originQuestions,
      createCacheQuestions,
    } = this.props;

    if (mode === 'create') {
      if (
        createCacheQuestions.thisId !== nextProps.createCacheQuestions.thisId
      ) {
        const { formValues } = this.props;
        let value = {
          content: '',
          title: '',
          hashTags: [],
        };
        if (formValues) {
          value = formValues;
        }

        this.props.updateResumeDetailCache({
          id: nextProps.createCacheQuestions.thisId,
          value: value,
        });

        this.changeFormValues(
          nextProps.createCacheQuestions.detail,
          nextProps.createCacheQuestions.thisId,
        );
      }
    } else if (mode === 'detail') {
      if (originQuestionId !== nextProps.originQuestionId) {
        this.changeFormValues(
          nextProps.originQuestions,
          nextProps.originQuestionId,
        );
      }
    }
  }

  changeFormValues(data, id) {
    const { change } = this.props;
    data.forEach(item => {
      if (item.questionId === id) {
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

  @autobind
  onClickAddHashTag() {}

  @autobind
  onClickContentSetting(e) {
    const { currentTarget } = e;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  }

  render() {
    const { formValues } = this.props;
    const { tags, open, anchorEl } = this.state;
    /* 
      TODO:  해시태그 추가 기능 만들기
    */
    return (
      <form>
        <div className={scss['detail__contents--hashtag']}>
          <HashTag name={'hashTags'} label={'해시태그'} tags={tags} />
          <Button
            variant="contained"
            color="primary"
            onClick={this.onClickAddHashTag}
          >
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
              <p>1 / 1000자</p>
              <Button
                variant="contained"
                color="primary"
                onClick={e => this.onClickContentSetting(e)}
              >
                설정
              </Button>
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={'left-end'}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper style={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>최대 글자 수</label>
                        <input />
                      </div>
                      <div>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Gender</FormLabel>
                          <RadioGroup
                            aria-label="Gender"
                            name="gender1"
                            value={this.state.value}
                            onChange={this.handleChange}
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="Other"
                            />
                            <FormControlLabel
                              value="disabled"
                              disabled
                              control={<Radio />}
                              label="(Disabled option)"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </Paper>
                  </Fade>
                )}
              </Popper>
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
  createCacheQuestions: PropTypes.func,
};
