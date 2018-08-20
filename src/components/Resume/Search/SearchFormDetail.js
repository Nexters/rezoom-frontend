import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectForm } from '../../Forms';
import scss from './Search.scss';

export class SearchFormDetail extends Component {
  render() {
    const {
      finishFlag,
      applicationYear,
      halfType,
      applicationType,
      passFlag,
    } = this.props;

    return (
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
    );
  }
}

SearchFormDetail.propTypes = {
  finishFlag: PropTypes.array,
  applicationYear: PropTypes.array,
  halfType: PropTypes.array,
  applicationType: PropTypes.array,
  passFlag: PropTypes.array,
};

export default SearchFormDetail;
