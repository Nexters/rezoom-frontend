import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scss from './Resumes.scss';
import {
  Button,
  Input,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

export class Resumes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resumeList: [
        {
          id: 1,
          title: '나의 첫번째 자소서',
          content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
        },
        {
          id: 2,
          title: '나의 두번째 자소서',
          content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
        },
        {
          id: 3,
          title: '나의 세번째 자소서',
          content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
        },
        {
          id: 4,
          title: '나의 네번째 자소서',
          content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
        },
        {
          id: 5,
          title: '나의 다섯번째 자소서',
          content: '다람쥐 헛 챗바퀴에 ~~~~~~~',
        },
      ],
    };
  }

  render() {
    const { resumeList } = this.state;

    return (
      <div className={scss.resumes}>
        <div className={scss['resumes__menu']}>
          <Button color="primary">+ 자소서 작성</Button>
          <ul>
            <li>합격한 자소서</li>
            <li>불합격한 자소서</li>
            <li>회사별 자소서</li>
          </ul>
        </div>
        <div className={scss['resumes__contents']}>
          <div className={scss['resumes__contents--search']}>
            <Input type="text" placeholder="자소서 보기" />
          </div>
          <div className={scss['resumes__contents--header']}>
            <div className={scss['title']}>
              <p>합격한 자소서</p>
            </div>
            <div className={scss['action']}>
              <p>카드형식</p>
              <p>리스트형식</p>
            </div>
          </div>
          <div className={scss['resumes__contents--list']}>
            {resumeList.map(item => {
              return (
                <Card key={item.id}>
                  <CardContent>
                    <Typography variant="headline" component="h2">
                      {item.title}
                    </Typography>
                    <Typography component="p">{item.content}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Resumes.propTypes = {};

export default Resumes;
