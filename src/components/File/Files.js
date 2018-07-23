import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../Shared/Sidebar/Sidebar';
import scss from './Files.scss';
import { Card, CardContent } from '@material-ui/core';

export class Files extends Component {
  render() {
    return (
      <div className={scss.files}>
        <Sidebar
          btnTitle={'자료 올리기'}
          list={[
            {
              id: 0,
              name: '증명서 전체보기',
              children: [
                { id: 0, name: '인적사항 증빙서' },
                { id: 1, name: '어학 증빙서' },
                { id: 2, name: '자격증 증빙서' },
                { id: 3, name: '수상 증빙서' },
              ],
            },
          ]}
        />
        <div className={scss['files__contents']}>
          {/*
            <div className={scss['files__contents--title']}>
              <div className={scss['title']}>
                <p>합격한 자소서</p>
              </div>
              <div className={scss['action']}>
                <p>카드형식</p>
                <p>리스트형식</p>
              </div>
            </div>
          */}
          <div className={scss['files__contents--row']}>
            <div className={scss['files__contents--header']}>
              <div className={scss['title']}>
                <p>합격한 자소서</p>
              </div>
              <div className={scss['action']}>
                <p>카드형식</p>
                <p>리스트형식</p>
              </div>
            </div>
            <div className={scss['files__contents--list']}>
              <Card key={1} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={2} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={3} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={4} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={5} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
              <Card key={6} className={scss['files__contents--item']}>
                <CardContent />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Files.propTypes = {};

export default Files;
