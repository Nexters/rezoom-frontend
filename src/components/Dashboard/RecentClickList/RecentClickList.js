import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RecentClickItem } from './RecentClickItem/RecentClickItem';

export class RecentClickList extends Component {
  static propTypes = {
    recentClickList: PropTypes.any,
  };

  render() {
    const { recentClickList } = this.props;
    return (
      <div>
        {recentClickList.length === 0 ? (
          '최근 조회한 데이터가 없습니다.'
        ) : (
          <div>
            {recentClickList.map((item, idx) => {
              return (
                <RecentClickItem
                  key={idx}
                  resumeId={item.resumeId}
                  companyName={item.companyName}
                  jobType={item.jobType}
                  clickDate={item.clickDate}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default RecentClickList;
