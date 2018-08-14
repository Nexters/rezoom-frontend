import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import * as animationData from './loading_liquid.json';
import scss from './Loader.scss';
@connect(
  state => ({
    loading: state.loader.container,
  }),
  {},
)
export class LoaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultOptions: {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
    };
  }

  render() {
    const { loading } = this.props;
    const { defaultOptions } = this.state;
    return loading ? (
      <div className={scss['loader__container']}>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    ) : null;
  }
}

LoaderContainer.propTypes = {
  loading: PropTypes.bool,
};

export default LoaderContainer;
