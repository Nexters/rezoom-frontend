import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashTagItem } from './HashTagItem/HashTagItem';
import scss from './HashtagList.scss';
import Scrollbars from 'react-custom-scrollbars';
import userIcon from '../../../static/images/dashboard/icon2.PNG';

export class HashtagList extends Component {
  static propTypes = {
    hashtagList: PropTypes.any,
    username: PropTypes.string,
  };

  render() {
    const { hashtagList, username } = this.props;
    return (
      <div style={{ height: '100%' }}>
        {hashtagList.length === 0 ? (
          '등록된 해시태그가 없습니다.'
        ) : (
          <div className={scss.hashtag}>
            <div className={scss.title}>
              <img src={userIcon} alt="user icon" />
              <div className={scss.typograph}>
                <p className={scss.user}>{username}님이</p>
                <p className={scss.info}>최근에 생성한 해시태그입니다.</p>
              </div>
            </div>
            <div className={scss.divider} />
            <Scrollbars
              autoHide
              autoHideTimeout={100}
              autoHideDuration={100}
              autoHeightMin={'100%'}
              autoHeightMax={'100%'}
              thumbMinSize={30}
              universal={true}
              className={scss.scroll}
            >
              {hashtagList.map((item, idx) => {
                return (
                  <HashTagItem
                    key={idx}
                    hashtagId={item.hashtagId}
                    hashtagKeyword={item.hashtagKeyword}
                  />
                );
              })}
            </Scrollbars>
          </div>
        )}
      </div>
    );
  }
}

export default HashtagList;
