import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';

@connect(
  state => ({}),
  {},
)
class MyPage extends Component {
  render() {
    const { resumes } = this.props;

    console.log(resumes);
    return (
      <div>
        <h1>MyPage</h1>
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
