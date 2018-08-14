import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './loading_liquid.json';
import { CircularProgress } from '@material-ui/core';

const loadingInjector = fetchingPropKey => ComposedComponent => {
  function WrapperComponent(props) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    return props[fetchingPropKey] ? (
      <Lottie options={defaultOptions} height={400} width={400} />
    ) : (
      <ComposedComponent {...props} />
    );
  }
  return WrapperComponent;
};

export default loadingInjector;
