import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RecentClickItem } from './RecentClickItem/RecentClickItem';
import { Divider } from '@material-ui/core';

export class RecentClickList extends Component {
  static propTypes = {
    recentClickList: PropTypes.any,
  };

  render() {
    const { recentClickList } = this.props;
    return recentClickList.length === 0 ? (
      <div>최근 조회한 데이터가 없습니다.</div>
    ) : (
      recentClickList.map((item, idx) => {
        return (
          <div key={idx}>
            <RecentClickItem
              resumeId={item.resumeId}
              companyName={item.companyName}
              jobType={item.jobType}
              clickDate={item.clickDate}
            />
            <Divider inset component="li" style={{ display: 'block' }} />
          </div>
        );
      })
    );
  }
}

export default RecentClickList;
