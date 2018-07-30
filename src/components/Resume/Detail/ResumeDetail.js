import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import scss from './ResumeDetail.scss';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import { ResumeDetailForm } from './ResumeDetailForm';

@connect(
  state => ({
    createCache: state.resume.createResumeCache,
  }),
  {},
)
export class ResumeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [1, 2, 3],
      selectedQuestion: 1,
    };
  }

  @autobind
  onClickQuestion(id) {
    console.log('onClickQuestion ! ', id);
    this.setState({
      selectedQuestion: id,
    });
  }

  render() {
    console.log(this.props);
    const { list, selectedQuestion } = this.state;
    const { match, createCache } = this.props;

    let resumeData, resumeTitle;

    if (match['params']['mode'] === 'detail') {
      resumeData = null;
      resumeTitle = '아직없음';
    } else if (match['params']['mode'] === 'create') {
      resumeData = createCache.info;
      resumeTitle = `${resumeData['companyName']} ${
        resumeData['department']
      } [??]`;
    }

    // console.log(resumeData);
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
                  onClick={e => this.onClickQuestion(e, item.id)}
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
          <p>Detail = {match['params'].id}</p>

          <div className={scss['detail__contents--mode']}>
            <Button variant="contained" color="primary">
              수정
            </Button>
            <Button variant="contained" color="primary">
              삭제
            </Button>
          </div>
          <div className={scss['detail__contents--header']}>
            <div className={scss['detail__contents--title']}>
              <p>
                {resumeTitle}
                <small>[{resumeData ? resumeData['q1'] : ''}]</small>
              </p>
              <Button variant="contained" color="primary">
                {resumeData ? resumeData['q3'] : ''}
              </Button>
            </div>
            <div className={scss['detail__contents--subtitle']}>
              <p>
                {resumeData ? resumeData['year'] : ''}년{' '}
                {resumeData ? resumeData['sub'] : ''}
              </p>
            </div>
          </div>
          <ResumeDetailForm
            selectedQuestion={selectedQuestion}
            mode={match['params']['mode']}
          />
        </div>
      </div>
    );
  }
}

ResumeDetail.propTypes = {
  match: PropTypes.object,
  createCache: PropTypes.any,
};

export default ResumeDetail;
