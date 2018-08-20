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
import { HashTagsDialog } from '../../Dialog/HashTags/HashTagsDialog';

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
      hashTagOpen: false,
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

  updateResumeDetailForm() {
    const {
      formValues,
      updateResumeDetailCache,
      createCacheQuestions,
    } = this.props;
    let value = {
      content: '',
      title: '',
      hashTags: [],
    };
    if (formValues) {
      value = formValues;
    }

    updateResumeDetailCache({
      id: createCacheQuestions.thisId,
      value: value,
    });
  }

  changeFormValues(data, id) {
    const { change } = this.props;
    data.forEach(item => {
      if (item.questionId === id) {
        change('content', item.content);
        change('title', item.title);
        if (item.hashTags.length > 0) {
          change('hashTags', item.hashTags);
          this.setState({
            tags: item.hashTags,
          });
        } else {
          change('hashTags', []);
          this.setState({
            tags: [],
          });
        }
      }
    });
  }

  @autobind
  onClickAddHashTag(e) {
    const { currentTarget } = e;
    this.setState(state => ({
      hashTagOpen: !state.hashTagOpen,
    }));
  }

  @autobind
  onClickContentSetting(e) {
    const { currentTarget } = e;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  }

  @autobind
  handleChange(a) {
    console.log(a);
  }

  @autobind
  hashTagDialogClose() {
    this.setState({
      hashTagOpen: false,
    });
  }

  @autobind
  updateTags(tags) {
    console.log('updateTags = ', tags);
    const { change } = this.props;
    this.setState({
      tags: tags,
    });
    change('hashTags', tags);

    this.updateResumeDetailForm();
  }

  render() {
    const { tags, open, anchorEl, hashTagOpen } = this.state;
    /* 
      TODO:  
      1. 해시태그 추가 했을때 등록 및 초기화 기능 수정
      2. title, content -> onChange시에 updateResumeDetailCache 할것
      3. detail로 들어왔을때도 cache에 담고 수정 가능하게 

    */
    return (
      <form>
        <div className={scss['detail__contents--question']}>
          <p className={scss['question__title']}>질문</p>
          <TextArea name={'title'} rows={4} />
          <div className={scss['hashtag']}>
            <HashTag name={'hashTags'} label={'해시태그'} tags={tags} />
            <Button
              variant="contained"
              color="primary"
              onClick={e => this.onClickAddHashTag(e)}
            >
              + 해시태그 편집
            </Button>
            {
              <HashTagsDialog
                tags={tags}
                dialogOpen={hashTagOpen}
                dialogClose={this.hashTagDialogClose}
                updateTags={this.updateTags}
              />
            }
          </div>
        </div>
        <div className={scss['detail__contents--answer']}>
          <div className={scss['answer__header']}>
            <p className={scss['answer__header--title']}>답변</p>
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
