import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import scss from './Resumes.scss';
import {
  Button,
  Input,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import loadingInjector from '../../hocs/withLoading';
import { Sidebar } from '../Shared/Sidebar/Sidebar';

@loadingInjector(true)
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
        <Sidebar
          btnTitle={'자소서 작성'}
          list={[
            { id: 0, name: '합격한 자소서', children: [] },
            { id: 1, name: '불합격한 자소서', children: [] },
            { id: 2, name: '회사별 자소서', children: [] },
          ]}
        />
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
                <Link key={item.id} className="" to={`/resume/${item.id}`}>
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
        </div>
      </div>
    );
  }
}

Resumes.propTypes = {};

export default Resumes;
