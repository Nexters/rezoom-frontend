import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

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
      width: '300px',
      height: '300px',
    };
    return (
      <div>
        {resumeStatisticsList.length === 0 ? (
          '등록된 이력서가 없습니다.'
        ) : (
          <div>
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
                  padding: 40,
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
