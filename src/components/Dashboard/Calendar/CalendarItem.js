import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Calendar from 'react-calendar-material';
import scss from './CalendarItem.scss';
// import { Calendar as MyCalendar } from 'react-calendar';
import { Calendar } from './Calendar';

export class CalendarItem extends Component {
  /**
   * 캘린더 모듈은 샘플.. (조건에 안맞음..))
   */
  static propTypes = {
    deadlineList: PropTypes.any,
  };

  render() {
    const { deadlineList } = this.props;

    return <Calendar showHeader={false} />;
  }
}

export default CalendarItem;
