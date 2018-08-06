import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import scss from './List.scss';

@connect(
  state => ({
    resumeList: state.resume.resumes,
  }),
  {},
)
export class List extends Component {
  static propTypes = {
    resumeList: PropTypes.any,
  };

  render() {
    const { resumeList } = this.props;

    console.log(resumeList);

    return (
      <div className={scss['resumes__contents--list']}>
        {resumeList.length === 0 ? (
          <div>
            <h1>데이터 없음</h1>
          </div>
        ) : (
          resumeList.map((item, idx) => {
            return (
              <Link
                key={idx}
                className=""
                to={`/resume/detail/${item.resumeId}`}
              >
                <Card>
                  <CardContent>
                    <Typography variant="headline" component="h2">
                      {item.companyName}
                    </Typography>
                    <Typography component="p">
                      {item.applicationType} - {item.createDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    );
  }
}

export default List;
