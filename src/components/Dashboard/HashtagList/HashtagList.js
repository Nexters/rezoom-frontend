import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashTagItem } from './HashTagItem/HashTagItem';

export class HashtagList extends Component {
  static propTypes = {
    hashtagList: PropTypes.any,
    username: PropTypes.string,
  };

  render() {
    const { hashtagList, username } = this.props;
    return (
      <div>
        {hashtagList.length === 0 ? (
          '등록된 해시태그가 없습니다.'
        ) : (
          <div>
            <div> {username}님이 최근에 생성한 해시태그입니다. </div>
            {hashtagList.map((item, idx) => {
              return (
                <HashTagItem
                  key={idx}
                  hashtagId={item.hashtagId}
                  hashtagKeyword={item.hashtagKeyword}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default HashtagList;
