import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Input, Button, FormControl, InputLabel } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import scss from './Search.scss';
import autobind from 'autobind-decorator';
import { TextInput, SelectForm } from '../../Forms';
import {
  resumeCreateFormData,
  questionSearchOption,
} from '../../../utils/Constans';
import { Field, reduxForm, fieldInputPropTypes, submit } from 'redux-form';
import { KeyboardArrowDown, SearchIcon } from '@material-ui/icons';
import AppSearch from './AppSearch';

@reduxForm({
  form: 'searchForm',
  enableReinitialize: true,
  initialValues: {
    applicationYear: 2018,
    halfType: 1,
    jobType: 1,
    applicationType: 1,
    finishFlag: 1,
    passFlag: 1,
  },
})
@connect(
  state => ({}),
  {},
)
@withRouter
export class SearchForm extends Component {
  constructor(props) {
    super(props);

    const {
      applicationYear,
      halfType,
      jobType,
      applicationType,
      finishFlag,
      passFlag,
    } = resumeCreateFormData;

    this.state = {
      applicationYear,
      halfType,
      jobType,
      applicationType,
      finishFlag,
      passFlag,
      questionSearchOption,
      serarchMode: 'resume', // resume: 자소서리스트, question: 문항
    };
  }

  @autobind
  onClickSearch() {
    // const { getResumeList } = this.props;
    // this.props.getResumeList();
    // props.history.push('/resume/search');
  }

  render() {
    const {
      applicationYear,
      halfType,
      jobType,
      applicationType,
      finishFlag,
      passFlag,
      questionSearchOption,
      serarchMode,
    } = this.state;

    return (
      <form className={scss['resumes__contents--search']}>
        <div className={scss['search__input']}>
          <div className={scss['search__change']}>
            <p>자소서 리스트</p>
            <KeyboardArrowDown />
          </div>
          {serarchMode === 'question' ? (
            <SelectForm
              name={'questionSearchOption'}
              label={'검색 방법'}
              items={questionSearchOption}
            />
          ) : null}

          <AppSearch />
          {/* <TextInput name={'companyName'} label={'검색하기'} /> */}
          {/* <Button
            variant="contained"
            color="primary"
            onClick={this.onClickSearch}
          >
            검색
          </Button> */}
        </div>
        <div className={scss['detail']}>
          <SelectForm name={'passFlag'} label={'합격 여부'} items={passFlag} />
          <SelectForm
            name={'applicationYear'}
            label={'연도'}
            items={applicationYear}
          />
          <SelectForm name={'halfType'} label={'분기'} items={halfType} />
          <SelectForm name={'jobType'} label={'직무'} items={jobType} />
          <SelectForm
            name={'applicationType'}
            label={'채용 형태'}
            items={applicationType}
          />
          <SelectForm
            name={'finishFlag'}
            label={'제출 여부'}
            items={finishFlag}
          />
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  // history: PropTypes.router,
  // getResumeList: PropTypes.func,
};

export default SearchForm;
