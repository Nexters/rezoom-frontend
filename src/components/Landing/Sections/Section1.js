import React, { Component } from 'react';
import scss from './Section.scss';
import mockup from '../../../static/images/landing/desktop_mockup.png';

export class Section1 extends Component {
  render() {
    return (
      <div className={scss.hero}>
        <div className={scss.hero__title}>
          <h2>자기소개서 관리로 합격까지 한번에</h2>
          <p>자소서, 복잡하게 관리하지마세요 가장 편한 툴을 경험해보세요</p>
        </div>
        <div className={scss.hero__cover}>
          <div className={scss.center}>
            <picture>
              <img src={mockup} alt="desktop mockup" />
            </picture>
          </div>
        </div>
      </div>
    );
  }
}

export default Section1;
