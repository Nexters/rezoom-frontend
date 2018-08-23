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
import {
  updateResumeDetailCache,
  updateResumeDetailCacheRealtime,
  updateResumeDetailOrigin,
  updateResumeDetailOriginRealtime,
  isUpdateModeChange,
} from '../../../store/Resume/Resume.store';
import { HashTag } from '../../Forms/hashTag';
import autobind from 'autobind-decorator';
import { HashTagsDialog } from '../../Dialog/HashTags/HashTagsDialog';
import Scrollbars from 'react-custom-scrollbars';

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
    updateResumeDetailCacheRealtime,
    updateResumeDetailOrigin,
    updateResumeDetailOriginRealtime,
    isUpdateModeChange,
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
      isUpdate: false,
      contentLength: 0,
      contentLengthError: [false, ''],
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      mode,
      originQuestionId,
      originQuestions,
      createCacheQuestions,
    } = this.props;

    const { formValues } = this.props;
    let value = {
      content: '',
      title: '',
      hashTags: [],
    };
    if (formValues) {
      value = formValues;
    }

    if (mode === 'create') {
      if (
        createCacheQuestions.thisId !== nextProps.createCacheQuestions.thisId
      ) {
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
        if (
          value.content.length !== 0 &&
          value.title.length !== 0 &&
          value.hashTags.length !== 0 &&
          this.state.isUpdate
        ) {
          this.props.updateResumeDetailOrigin({
            id: originQuestionId,
            value: value,
          });
          this.setState({
            isUpdate: false,
            contentLength: value.content.length,
          });
        }

        this.changeFormValues(
          nextProps.originQuestions,
          nextProps.originQuestionId,
        );
      }
    }
  }

  updateResumeDetailForm(data) {
    const {
      formValues,
      updateResumeDetailCacheRealtime,
      createCacheQuestions,
      updateResumeDetailOriginRealtime,
      originQuestionId,
      mode,
    } = this.props;

    let value = {
      content: '',
      title: '',
      hashTags: [],
    };

    if (formValues) {
      value = formValues;
    }

    if (data.hasOwnProperty('tags')) {
      value.hashTags = data.tags.join();
    } else if (data.hasOwnProperty('value')) {
      if (data.name === 'content') {
        value.content = data.value;
      } else if (data.name === 'title') {
        value.title = data.value;
      }
    }

    if (mode === 'create') {
      updateResumeDetailCacheRealtime({
        id: createCacheQuestions.thisId,
        value: value,
      });
    } else {
      updateResumeDetailOriginRealtime({
        id: originQuestionId,
        value: value,
      });
    }
  }

  changeFormValues(data, id) {
    const { change } = this.props;
    data.forEach(item => {
      if (item.content.length > 0) {
        this.setState({
          contentLength: item.content.length,
        });
      }
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

  /* @autobind
  handleChange(a) {
    console.log(a);
  } */

  @autobind
  hashTagDialogClose() {
    this.setState({
      hashTagOpen: false,
    });
  }

  @autobind
  updateTags(tags) {
    const { change } = this.props;
    this.setState({
      tags: tags,
      isUpdate: true,
    });
    change('hashTags', tags);

    this.updateResumeDetailForm({ tags: tags });
    this.props.isUpdateModeChange(true);
  }

  @autobind
  updateText(value, name) {
    if (value.length > 1000) {
      this.setState({
        contentLengthError: [true, '글자 수가 초과되었습니다.'],
      });
    } else {
      this.setState({
        isUpdate: true,
        contentLength: value.length,
        contentLengthError: [false, ''],
      });
    }
    this.updateResumeDetailForm({ value: value, name: name });
    this.props.isUpdateModeChange(true);
  }

  render() {
    const { tags, hashTagOpen, contentLength, contentLengthError } = this.state;

    return (
      <Scrollbars
        autoHide
        autoHideTimeout={100}
        autoHideDuration={100}
        autoHeightMin={'100%'}
        autoHeightMax={'100%'}
        thumbMinSize={30}
        universal={true}
        // style={{ flex: 1, order: 2 }}
      >
        <form>
          <div className={scss['detail__contents--question']}>
            <p className={scss['question__title']}>질문</p>
            <TextArea
              name={'title'}
              rows={4}
              rowsMax={8}
              updateText={this.updateText}
            />
            <div className={scss['hashtag']}>
              <HashTag
                name={'hashTags'}
                label={'해시태그'}
                tags={tags}
                onClickAddHashTag={this.onClickAddHashTag}
              />
              <HashTagsDialog
                tags={tags}
                dialogOpen={hashTagOpen}
                dialogClose={this.hashTagDialogClose}
                updateTags={this.updateTags}
              />
            </div>
          </div>
          <div className={scss['detail__contents--answer']}>
            <div className={scss['answer__header']}>
              <p className={scss['answer__header--title']}>답변</p>
              <div className={scss['answer__header--action']}>
                <p
                  style={{
                    color: contentLengthError[0] ? '#f1552f' : '#668298',
                  }}
                >
                  {contentLengthError[0] ? contentLengthError[1] : null}
                  {contentLength} / 1000자
                </p>
                {/* <Button
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
              </Popper> */}
              </div>
            </div>
            <TextArea
              name={'content'}
              rows={4}
              rowsMax={100}
              className={scss['answer__contents']}
              updateText={this.updateText}
            />
          </div>
        </form>
      </Scrollbars>
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
  updateResumeDetailCacheRealtime: PropTypes.func,
  updateResumeDetailOrigin: PropTypes.func,
  updateResumeDetailOriginRealtime: PropTypes.func,
  isUpdateModeChange: PropTypes.func,
};
