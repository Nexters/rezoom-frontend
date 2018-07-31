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
  static proptypes = {
    resumeList: PropTypes.any,
  };

  render() {
    const { props } = this;

    console.log(props.resumeList);

    return (
      <div className={scss['resumes__contents--list']}>
        {props.resumeList.map(item => {
          return (
            <Link key={item.id} className="" to={`/resume/detail/${item.id}`}>
              <Card>
                <CardContent>
                  <Typography variant="headline" component="h2">
                    {item.title}
                  </Typography>
                  <Typography component="p">{item.content}</Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default List;
