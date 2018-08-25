import React, { Component } from 'react';
import { SectionsContainer, Section, Header, Footer } from 'react-fullpage';
import { Link } from 'react-router-dom';
import { Section1, Section2, Section3, Section4 } from './Sections';
import scss from './Landing.scss';
import logo from '../../static/images/logo/ic-logo-width.svg';
import { Button } from '@material-ui/core';

export class Landing extends Component {
  render() {
    let options = {
      sectionClassName: 'section',
      anchors: ['1', '2', '3', '4'],
      scrollBar: false,
      navigation: true,
      verticalAlign: false,
      sectionPaddingTop: '0px',
      sectionPaddingBottom: '0px',
      arrowNavigation: true,
    };

    return (
      <div>
        <Header>
          <div className={scss.header}>
            <h1>
              <img src={logo} alt="로고" />
            </h1>
            <div className={scss.login}>
              <Link to={`/login`}>
                <Button size="small" variant="raised">
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        </Header>
        <SectionsContainer {...options}>
          <Section>
            <Section1 />
          </Section>
          <Section>
            <Section2 />
          </Section>
          <Section>
            <Section3 />
          </Section>
          <Section>
            <Section4 />
          </Section>
        </SectionsContainer>
      </div>
    );
  }
}
// => in the render() method of your app
