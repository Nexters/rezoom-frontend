import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import scss from './Search.scss';
import autobind from 'autobind-decorator';
import { TextInput, SelectForm } from '../../Forms';
import { resumeCreateFormData } from '../../../utils/Constans';
import { Field, reduxForm, fieldInputPropTypes, submit } from 'redux-form';

@withRouter
@reduxForm({
  form: 'searchForm',
  enableReinitialize: true,
  initialValues: {
    year: 2018,
    sub: 1,
    department: 1,
    q1: 1,
    q2: 1,
    q3: 1,
  },
})
export class SearchForm extends Component {
  constructor(props) {
    super(props);

    const { year, sub, department, q1, q2, q3 } = resumeCreateFormData;

    this.state = {
      year,
      sub,
      department,
      q1,
      q2,
      q3,
    };
  }

  @autobind
  onClickSearch() {
    console.log('onClick search = ', this.props);
    const { props } = this;
    props.history.push('/resume/search');
  }

  render() {
    const { year, sub, department, q1, q2, q3 } = this.state;

    return (
      <form className={scss['resumes__contents--search']}>
        <div className={scss['detail']}>
          <SelectForm name={'q3'} label={'합격 여부'} items={q3} />
          <SelectForm name={'year'} label={'연도'} items={year} />
          <SelectForm name={'sub'} label={'분기'} items={sub} />
          <SelectForm name={'department'} label={'직무'} items={department} />
          <SelectForm name={'q1'} label={'형태'} items={q1} />
          <SelectForm name={'q2'} label={'제출 여부'} items={q2} />
        </div>
        <div className={scss['search--input']}>
          <Input
            type="search"
            placeholder="검색어를 입력해 주세요."
            fullWidth={true}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.onClickSearch}
          >
            검색
          </Button>
        </div>
      </form>
    );
  }
}

SearchForm.proptypes = {
  history: PropTypes.router,
};

export default SearchForm;
