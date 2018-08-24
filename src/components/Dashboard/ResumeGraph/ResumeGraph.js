import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import scss from './ResumeGraph.scss';

export class ResumeGraph extends Component {
  static propTypes = {
    resumeStatisticsList: PropTypes.any,
  };

  render() {
    const { resumeStatisticsList } = this.props;
    const data = {
      labels: [
        resumeStatisticsList.pass.title,
        resumeStatisticsList.nonPass.title,
        resumeStatisticsList.submit.title,
        resumeStatisticsList.nonSubmit.title,
      ],
      datasets: [
        {
          data: [
            resumeStatisticsList.pass.ratio,
            resumeStatisticsList.nonPass.ratio,
            resumeStatisticsList.submit.ratio,
            resumeStatisticsList.nonSubmit.ratio,
          ],
          backgroundColor: ['#4a61f5', '#8594fe', '#a6b2ff', '#d3d8fc'],
          hoverBackgroundColor: ['#4a61f5', '#8594fe', '#a6b2ff', '#d3d8fc'],
          borderWidth: 0,
        },
      ],
    };
    const style = {
      width: '100%',
      height: '100%',
    };
    return (
      <div className={scss.chart__area}>
        {resumeStatisticsList.length === 0 ? (
          '등록된 이력서가 없습니다.'
        ) : (
          <div style={style}>
            <Doughnut
              data={data}
              width={300}
              height={300}
              options={{
                maintainAspectRatio: false,
                cutoutPercentage: 88,
                legend: {
                  display: false,
                },
                layout: {
                  padding: 0,
                },
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ResumeGraph;
