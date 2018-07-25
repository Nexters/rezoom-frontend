import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scss from './ResumeDetail.scss';
import { Button, Chip } from '@material-ui/core';

export class ResumeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [1, 2, 3],
    };
  }

  render() {
    console.log(this.props);
    const { list } = this.state;
    const { match } = this.props;

    return (
      <div className={scss.detail}>
        <div className={scss['detail__sidebar']}>
          <div className={scss['detail__sidebar--header']}>
            <p>문항</p>
            <Button variant="outlined" color="primary">
              삭제
            </Button>
          </div>
          <ul>
            {list.map(item => {
              // console.log(item);
              return (
                <li
                  key={item}
                  // className={item.active ? scss['sidebar__active'] : ''}
                  // onClick={e => this.onClickMenu(e, item.id)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          <Button variant="outlined" color="primary">
            + 문항추가
          </Button>
        </div>
        <div className={scss['detail__contents']}>
          <div className={scss['detail__contents--mode']}>
            <Button variant="contained" color="primary">
              수정
            </Button>
            <Button variant="contained" color="primary">
              삭제
            </Button>
          </div>
          <div className={scss['detail__contents--title']}>
            <p>
              LG 마케팅영업부 [SNS/온라인컨텐츠] <small>[신입]</small>
            </p>
            <Button variant="contained" color="primary">
              합격
            </Button>
          </div>
          <div className={scss['detail__contents--subtitle']}>
            <p>2018년 상반기</p>
          </div>
          <div className={scss['detail__contents--hashtag']}>
            <Chip label="#LG" />
            <Chip label="#열정" />
            <Chip label="#가고싶은회사" />
            <Button variant="contained" color="primary">
              # 해시태그 추가
            </Button>
          </div>
          <div className={scss['detail__contents--question']}>
            <p className={scss['question__title']}>질문</p>
            <p>
              본인의 열정에 대하여 <br /> Guide - 본인이 지원한 직무와 관련된
              지식, 경험,역량및 관심사항 등 자신을 어필할 수 있는 내용을
              구체적으로기술해주시기 바랍니다. (핵심위주로 근거에 기반하여
              간략하게 기술부탁드립니다.)
            </p>
          </div>
          <div className={scss['detail__contents--answer']}>
            <div className={scss['answer__header']}>
              <p>답변</p>
              <div className={scss['answer__header--action']}>
                <p>800 / 1000자</p>
                <Button variant="contained" color="primary">
                  설정
                </Button>
              </div>
            </div>
            <textarea className={scss['answer__contents']} />
          </div>
          <p>Detail = {match['params'].id}</p>
        </div>
      </div>
    );
  }
}

ResumeDetail.propTypes = {
  match: PropTypes.object,
};

export default ResumeDetail;
