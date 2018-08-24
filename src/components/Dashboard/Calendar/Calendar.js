import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Calendar as MyCalendar } from 'react-calendar';

export class Calendar extends Component {
  /**
   * 캘린더 모듈은 샘플.. (조건에 안맞음..))
   */
  static propTypes = {
    deadlineList: PropTypes.any,
  };

  render() {
    const { deadlineList } = this.props;

    return (
      <div>
        <MyCalendar />
      </div>
    );
  }
}

export default Calendar;
