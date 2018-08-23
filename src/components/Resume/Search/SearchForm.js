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
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { searchResumes } from '../../../store/Search/Search.store';
import { Button, IconButton } from '@material-ui/core';
import { SearchFormDetail } from './SearchFormDetail';
import { SeacrhMenuPopper } from './SearchMenuPopper';
import searchIcon from '../../../static/images/item/ic-search.svg';
import clearIcon from '../../../static/images/item/ic-cancel.svg';

@reduxForm({
  form: 'searchForm',
  initialValues: {
    companyName: '',
    applicationYear: 2018,
    halfType: '상반기',
    applicationType: '1',
    finishFlag: 0,
    passFlag: 0,
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
    change: (key, value) => change('searchForm', key, value),
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
      searchInputOpen: false,
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

  @autobind
  onClickSearch() {
    this.setState({
      searchInputOpen: !this.state.searchInputOpen,
    });
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
      searchInputOpen,
    } = this.state;

    const { pathname } = this.props;

    const searchButton = searchMode.filter(item => item.active === true);

    let width = 0;

    if (searchInputOpen) {
      width = 365;
    } else {
      width = 0;
    }

    if (pathname === '/dashboard' || pathname === '/mypage') {
      return (
        <div
          className={scss['resumes__contents--search']}
          style={{ height: 100 }}
        >
          <div className={scss['search__input']}>
            <div className={scss['search__change']}>
              <Button>{pathname === '/dashboard' ? '홈' : '마이페이지'}</Button>
            </div>
            <div className={[scss['search__input--right']]}>
              <IconButton
                className={scss['search__button']}
                aria-label="Delete"
                onClick={this.onClickSearch}
              >
                <img src={searchIcon} alt="searchIcon" />
              </IconButton>
              <Field
                className={
                  searchInputOpen
                    ? scss['input__search--open']
                    : scss['input__search--close']
                }
                style={{ width: width, transition: 'width 0.5s' }}
                name="searchText"
                component="input"
                type="text"
                placeholder="검색어를 입력해주세요."
                onKeyPress={e => this.onKeyPress(e)}
              />
              <IconButton
                className={scss['clear__button']}
                onClick={() => this.props.change('searchText', '')}
                style={{ display: searchInputOpen ? 'block' : 'none' }}
              >
                <img src={clearIcon} alt="searchIcon" />
              </IconButton>
              <Field
                name="mode"
                component="input"
                type="text"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
      );
    } else {
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
                  className={scss['search__option']}
                  name={'questionSearchOption'}
                  label={'검색 방법'}
                  items={questionSearchOption}
                />
              ) : null}
              <IconButton
                className={scss['search__button']}
                aria-label="Delete"
                onClick={this.onClickSearch}
              >
                <img src={searchIcon} alt="searchIcon" />
              </IconButton>
              <Field
                className={
                  searchInputOpen
                    ? scss['input__search--open']
                    : scss['input__search--close']
                }
                style={{ width: width, transition: 'width 0.5s' }}
                name="searchText"
                component="input"
                type="text"
                placeholder="검색어를 입력해주세요."
                onKeyPress={e => this.onKeyPress(e)}
              />
              <IconButton
                className={scss['clear__button']}
                onClick={() => this.props.change('searchText', '')}
                style={{ display: searchInputOpen ? 'block' : 'none' }}
              >
                <img src={clearIcon} alt="searchIcon" />
              </IconButton>
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
}

SearchForm.propTypes = {
  submit: PropTypes.func,
  change: PropTypes.func,
  pathname: PropTypes.object,
};

export default SearchForm;
