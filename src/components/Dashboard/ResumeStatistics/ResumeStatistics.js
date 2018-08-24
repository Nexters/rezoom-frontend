import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scss from './ResumeStatistics.scss';
import { Button } from '@material-ui/core';

export class ResumeStatistics extends Component {
  static propTypes = {
    resumeStatisticsList: PropTypes.any,
    username: PropTypes.string,
    deadlineList: PropTypes.any,
    resumes: PropTypes.array,
  };

  render() {
    const {
      resumeStatisticsList,
      username,
      deadlineList,
      resumes,
    } = this.props;
    return (
      <div className={scss.resume__statistics}>
        <div className={scss.statistics__title}>
          {username}님의 자기소개서 현황입니다.
        </div>
        <div className={scss.statistics__total}>
          {`자소서는 총 ${resumes.length}개 입니다.`}
        </div>
        <div className={scss.statistics__info}>
          <div className={scss['statistics__info--item']}>
            <div className={scss.item__title}>
              <div
                className={scss.squre}
                style={{ backgroundColor: '#4a61f5' }}
              />
              <div className={scss.title}>
                {resumeStatisticsList.pass.title}
              </div>
            </div>

            <div className={scss.resumenum}>
              {resumeStatisticsList.pass.resumeNum}개
            </div>

            <div className={scss.divider} />

            <div className={scss.ratio}>{resumeStatisticsList.pass.ratio}%</div>

            <Button variant="outlined" className={scss.button}>
              바로가기
            </Button>
          </div>

          <div className={scss['statistics__info--item']}>
            <div className={scss.item__title}>
              <div
                className={scss.squre}
                style={{ backgroundColor: '#8594fe' }}
              />
              <div className={scss.title}>
                {resumeStatisticsList.submit.title}
              </div>
            </div>

            <div className={scss.resumenum}>
              {resumeStatisticsList.submit.resumeNum}개
            </div>

            <div className={scss.divider} />

            <div className={scss.ratio}>
              {resumeStatisticsList.submit.ratio}%
            </div>

            <Button variant="outlined" component="span" className={scss.button}>
              바로가기
            </Button>
          </div>

          <div className={scss['statistics__info--item']}>
            <div className={scss.item__title}>
              <div
                className={scss.squre}
                style={{ backgroundColor: '#a6b2ff' }}
              />
              <div className={scss.title}>
                {resumeStatisticsList.nonSubmit.title}
              </div>
            </div>

            <div className={scss.resumenum}>
              {resumeStatisticsList.nonSubmit.resumeNum}개
            </div>

            <div className={scss.divider} />

            <div className={scss.ratio}>
              {resumeStatisticsList.nonSubmit.ratio}%
            </div>

            <Button variant="outlined" component="span" className={scss.button}>
              바로가기
            </Button>
          </div>

          <div className={scss['statistics__info--item']}>
            <div className={scss.item__title}>
              <div
                className={scss.squre}
                style={{ backgroundColor: '#d3d8fc' }}
              />
              <div className={scss.title}>
                {resumeStatisticsList.nonPass.title}
              </div>
            </div>

            <div className={scss.resumenum}>
              {resumeStatisticsList.nonPass.resumeNum}개
            </div>

            <div className={scss.divider} />

            <div className={scss.ratio}>
              {resumeStatisticsList.nonPass.ratio}%
            </div>

            <Button variant="outlined" component="span" className={scss.button}>
              바로가기
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeStatistics;
