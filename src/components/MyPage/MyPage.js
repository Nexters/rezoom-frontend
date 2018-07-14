import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import {
  updateResumeList,
  testFetchData,
} from '../../store/Resume/Resume.store';

@connect(
  state => ({
    resumes: state.resume.resumes,
  }),
  {
    updateResumeList,
    testFetchData,
  },
)
class MyPage extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillReceiveProps() {
  //   console.log(
  //     `----------------------------- componentDidUpdate --------------------------------`,
  //   );
  //   console.log(prevProps);
  //   console.log(prevState);
  //   console.log(snapshot);
  // }

  _testFetchDataCall(e) {
    e.stopPropagation();

    this.props.testFetchData();
  }

  _onClickButtonTest(e) {
    console.log('resume 추가');
    e.stopPropagation();

    this.props.updateResumeList({
      id: 3,
      name: '테스트3',
      contents: 'kekeke kikikiki',
    });
  }

  render() {
    const { resumes } = this.props;

    console.log(resumes);
    return (
      <div>
        <h1>MyPage</h1>
        <ul>
          {resumes.map((item, idx) => {
            return (
              <li key={idx} style={{ display: 'flex' }}>
                <p style={{ width: 100, marginLeft: 16 }}>{item.id}</p>
                <p style={{ width: 100, marginLeft: 16 }}>{item.name}</p>
                <p style={{ width: 100, marginLeft: 16 }}>{item.contents}</p>
              </li>
            );
          })}
        </ul>

        <button onClick={e => this._onClickButtonTest(e)}>레쥬메 추가</button>
        <button onClick={e => this._testFetchDataCall(e)}>테스트</button>
      </div>
    );
  }
}

MyPage.propTypes = {
  resumes: PropTypes.Array,
  updateResumeList: PropTypes.func,
  testFetchData: PropTypes.func,
};

export default MyPage;
