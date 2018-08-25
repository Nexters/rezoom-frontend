import React, { Component } from 'react';
import scss from './Section.scss';
import image from '../../../static/images/landing/cover_visual_04.png';

export class Section4 extends Component {
  render() {
    return (
      <div className={scss.section__third}>
        <div className={scss.cover}>
          <picture>
            <img src={image} alt="image" />
          </picture>
        </div>
        <div className={scss.title}>
          <h2>
            체계적인 라벨으로<br />자소서를 검색하세요
          </h2>
          <p>
            기업이름.합격여부.제출여부.제출마감일 등 <br />체계적인 라벨관리로
            관리하고 필터를 통해 찾을수있습니다
          </p>
        </div>
      </div>
    );
  }
}

export default Section4;
