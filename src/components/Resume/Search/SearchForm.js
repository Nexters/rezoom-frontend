import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import scss from './Search.scss';
import autobind from 'autobind-decorator';
import { SelectForm } from '../../Forms';
import {
  resumeCreateFormData,
  questionSearchOption,
} from '../../../utils/Constans';
import { Field, reduxForm, submit } from 'redux-form';
import { KeyboardArrowDown, SearchIcon } from '@material-ui/icons';
import AppSearch from './AppSearch';
import { searchResumes } from '../../../store/Search/Search.store';

@reduxForm({
  form: 'searchForm',
  initialValues: {
    companyName: '',
    applicationYear: 2018,
    halfType: 1,
    applicationType: '1',
    finishFlag: '1',
    passFlag: '1',
  },
  onSubmit: (values, dispatch) => {
    dispatch(searchResumes(values));
  },
})
@connect(
  state => ({}),
  {
    submit: () => submit('searchForm'),
  },
)
@withRouter
export class SearchForm extends Component {
  constructor(props) {
    super(props);

    const {
      applicationYear,
      halfType,
      applicationType,
      finishFlag,
      passFlag,
    } = resumeCreateFormData;

    this.state = {
      applicationYear,
      halfType,
      applicationType,
      finishFlag,
      passFlag,
      questionSearchOption,
      serarchMode: 'resume', // resume: 자소서리스트, question: 문항
    };
  }

  @autobind
  onKeyPress(e) {
    e.stopPropagation();
    if (e.hasOwnProperty('key')) {
      if (e.key === 'Enter') {
        this.props.submit();
      }
    }
  }

  render() {
    const {
      applicationYear,
      halfType,
      applicationType,
      finishFlag,
      passFlag,
      questionSearchOption,
      serarchMode,
    } = this.state;

    return (
      <div className={scss['resumes__contents--search']}>
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

          {/* <Field name={'companyName'} component={AppSearch} label={'label'} /> */}
          <Field
            name="companyName"
            component="input"
            type="text"
            placeholder="회사명"
            onKeyPress={e => this.onKeyPress(e)}
          />
        </div>
        <form className={scss['detail']}>
          <SelectForm
            name={'finishFlag'}
            label={'제출 여부'}
            items={finishFlag}
            placeholder={'제출 여부'}
          />
          <SelectForm
            name={'applicationYear'}
            label={'연도'}
            items={applicationYear}
            placeholder={'연도'}
          />
          <SelectForm
            name={'halfType'}
            label={'분기'}
            items={halfType}
            placeholder={'분기'}
          />
          <SelectForm
            name={'applicationType'}
            label={'채용 형태'}
            items={applicationType}
            placeholder={'채용 형태'}
          />
          <SelectForm
            name={'passFlag'}
            label={'합격 여부'}
            items={passFlag}
            placeholder={'합격 여부'}
          />
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  submit: PropTypes.func,
  // history: PropTypes.router,
  // getResumeList: PropTypes.func,
};

export default SearchForm;
