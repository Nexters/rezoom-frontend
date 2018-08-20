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
import { Field, reduxForm, submit, change } from 'redux-form';
import {
  KeyboardArrowDown,
  SearchIcon,
  KeyboardArrowUp,
} from '@material-ui/icons';
import AppSearch from './AppSearch';
import { searchResumes } from '../../../store/Search/Search.store';
import {
  Paper,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  Button,
} from '@material-ui/core';
import { SearchFormDetail } from './SearchFormDetail';
import { SeacrhMenuPopper } from './SearchMenuPopper';

@reduxForm({
  form: 'searchForm',
  initialValues: {
    companyName: '',
    applicationYear: 2018,
    halfType: 1,
    applicationType: '1',
    finishFlag: '1',
    passFlag: '1',
    mode: 'resumes',
    questionSearchOption: 'keyword',
  },
  onSubmit: (values, dispatch) => {
    dispatch(searchResumes(values));
  },
})
@connect(
  state => ({}),
  {
    submit: () => submit('searchForm'),
    change: (key, value) => change('resumeDetail', key, value),
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
      searchMode: [
        { key: '자소서 리스트', id: 0, active: true },
        { key: '문항별 리스트', id: 1, active: false },
      ],
      menusAnchorEl: null,
      menusOpen: false,
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

  @autobind
  handleToggle(e) {
    e.stopPropagation();
    const { currentTarget } = e;
    this.setState(state => ({
      menusOpen: !state.open,
      menusAnchorEl: currentTarget,
    }));
  }

  @autobind
  closeSearchMenuPopper(e, id) {
    e.stopPropagation();

    if (this.state.menusAnchorEl.contains(event.target)) {
      return;
    }

    if (id === 0 || id === 1) {
      const searchMode = Object.assign([], this.state.searchMode);
      searchMode.forEach(item => {
        if (item.id === id) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      this.setState({
        searchMode: searchMode,
        menusOpen: false,
      });
      if (id === 0) {
        this.props.change('mode', 'resumes');
      } else if (id === 1) {
        this.props.change('mode', 'questions');
      }
    } else {
      this.setState({
        menusOpen: false,
      });
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
      searchMode,
      menusAnchorEl,
      menusOpen,
    } = this.state;

    const searchButton = searchMode.filter(item => item.active === true);

    return (
      <div className={scss['resumes__contents--search']}>
        <div className={scss['search__input']}>
          <div className={scss['search__change']}>
            <Button
              aria-owns={menusOpen ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={e => this.handleToggle(e)}
            >
              {searchButton[0].key}
              {menusOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>
            <SeacrhMenuPopper
              menusOpen={menusOpen}
              menusAnchorEl={menusAnchorEl}
              closeSearchMenuPopper={this.closeSearchMenuPopper}
            />
          </div>
          <div className={[scss['search__input--right']]}>
            {searchMode[1].active ? (
              <SelectForm
                name={'questionSearchOption'}
                label={'검색 방법'}
                items={questionSearchOption}
              />
            ) : null}
            <Field
              name="searchText"
              component="input"
              type="text"
              placeholder="검색어를 입력해주세요."
              onKeyPress={e => this.onKeyPress(e)}
            />
            <Field
              name="mode"
              component="input"
              type="text"
              style={{ display: 'none' }}
            />
          </div>
        </div>
        {searchMode[1].active ? null : (
          <SearchFormDetail
            finishFlag={finishFlag}
            applicationYear={applicationYear}
            halfType={halfType}
            applicationType={applicationType}
            passFlag={passFlag}
          />
        )}
      </div>
    );
  }
}

SearchForm.propTypes = {
  submit: PropTypes.func,
  change: PropTypes.func,
};

export default SearchForm;
