import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DeadlineListItem } from './DeadlineListItem/DeadlineListItem';
import scss from './DeadlineList.scss';

export class DeadlineList extends Component {
  static propTypes = {
    deadlineList: PropTypes.any,
  };

  render() {
    const { deadlineList } = this.props;

    return (
      <div>
        {deadlineList.length === 0 ? (
          '마감 예정 지원서가 없습니다.'
        ) : (
          <div>
            {deadlineList.map((item, idx) => {
              return (
                <DeadlineListItem
                  key={idx}
                  companyName={item.companyName}
                  jobType={item.jobType}
                  deadline={item.deadline}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DeadlineList;
