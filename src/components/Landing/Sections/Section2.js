import React, { Component } from 'react';
import scss from './Section.scss';
import image from '../../../static/images/landing/cover_visual_02.png';

export class Section2 extends Component {
  render() {
    return (
      <div className={scss.section__first}>
        <div className={scss.title}>
          <h2>
            자소서에 대한 현황을 <br />한 눈에 보여드립니다
          </h2>
          <p>
            합격.제출.미제출.불합격과 같은<br /> 정보를 한번에 보여주고 빠르게
            접근할 수 있습니다
          </p>
        </div>
        <div className={scss.cover}>
          <picture>
            <img src={image} alt="image" />
          </picture>
        </div>
      </div>
    );
  }
}

export default Section2;
