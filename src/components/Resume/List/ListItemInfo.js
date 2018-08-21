import React, { Component } from 'react';
import PropTypes from 'prop-types';
import submitIcon from '../../../static/images/list/ic-item-submit.svg';
import yearIcon from '../../../static/images/list/ic-item-year.svg';
import halfTypeIcon from '../../../static/images/list/ic-item-period.svg';
import typeIcon from '../../../static/images/list/ic-item-type.svg';
import scss from './ListItemInfo.scss';

export class ListItemInfo extends Component {
  render() {
    const {
      applicationType,
      applicationYear,
      halfType,
      finishFlag,
    } = this.props;
    return (
      <div className={scss['list__item']}>
        <div className={scss['list__item--box']}>
          <div className={scss['item__top']}>
            <img src={submitIcon} alt="list-item-icon" />
            <p>제출여부</p>
          </div>
          <div className={scss['item__bottom']}>
            <p>{finishFlag}</p>
          </div>
        </div>

        <div className={scss['list__item--box']}>
          <div className={scss['item__top']}>
            <img src={yearIcon} alt="list-item-icon" />
            <p>연도</p>
          </div>
          <div className={scss['item__bottom']}>
            <p>{applicationYear}</p>
          </div>
        </div>

        <div className={scss['list__item--box']}>
          <div className={scss['item__top']}>
            <img src={halfTypeIcon} alt="list-item-icon" />
            <p>분기</p>
          </div>
          <div className={scss['item__bottom']}>
            <p>{halfType}</p>
          </div>
        </div>

        <div className={scss['list__item--box']}>
          <div className={scss['item__top']}>
            <img src={typeIcon} alt="list-item-icon" />
            <p>채용형태</p>
          </div>
          <div className={scss['item__bottom']}>
            <p>{applicationType}</p>
          </div>
        </div>
      </div>
    );
  }
}

ListItemInfo.propTypes = {
  applicationType: PropTypes.string,
  applicationYear: PropTypes.number,
  halfType: PropTypes.string,
  finishFlag: PropTypes.string,
};
