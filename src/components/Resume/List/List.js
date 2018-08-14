import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import scss from './List.scss';
import autobind from 'autobind-decorator';
import Scrollbars from 'react-custom-scrollbars';

export class List extends Component {
  static propTypes = {
    resumeList: PropTypes.any,
  };

  render() {
    const { resumeList } = this.props;
    // console.log(resumeList);

    return (
      <Scrollbars
        autoHide
        autoHideTimeout={100}
        autoHideDuration={100}
        autoHeightMin={'100%'}
        autoHeightMax={'100%'}
        thumbMinSize={30}
        universal={true}
        className={scss['resumes__contents--list']}
        // style={{flex: 1, order : 2}}
      >
        {resumeList.length === 0 ? (
          <div>
            <h1> 데이터 없음 </h1>
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
      </Scrollbars>
    );
  }
}

export default List;
