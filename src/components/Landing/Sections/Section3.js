import React, { Component } from 'react';
import scss from './Section.scss';
import image from '../../../static/images/landing/cover_visual_03.png';

export class Section3 extends Component {
  render() {
    return (
      <div className={scss.section__second}>
        <div className={scss.title}>
          <h2>
            의미가 같은 문항들은 <br />해시태그로 관리하세요
          </h2>

          <p>
            자소서의 문항에 해시태그를 달아 <br />표현은 다르나 의미는 같은
            문항들을 관리할 수 있습니다.
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

export default Section3;
