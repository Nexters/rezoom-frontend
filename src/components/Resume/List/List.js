import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import scss from './List.scss';
import { ListItemInfo } from './ListItemInfo';

export class List extends Component {
  static propTypes = {
    resumeList: PropTypes.any,
  };

  render() {
    const { resumeList } = this.props;

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
          <Grid container spacing={24}>
            {resumeList.map((item, idx) => {
              return (
                <Grid item lg={6} sm={12} xs={12} key={idx}>
                  <Link to={`/resume/detail/${item.resumeId}`}>
                    <Card className={scss['card']}>
                      <div className={scss['list__header']}>
                        <p>{item.companyName}</p>
                      </div>
                      <ListItemInfo
                        applicationType={item.applicationType}
                        applicationYear={item.applicationYear}
                        halfType={item.halfType}
                        finishFlag={item.finishFlag}
                      />
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Scrollbars>
    );
  }
}

export default List;
