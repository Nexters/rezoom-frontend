import React from 'react';
import { CircularProgress } from '@material-ui/core';

const loadingInjector = fetchingPropKey => ComposedComponent => {
  function WrapperComponent(props) {
    // console.log(props);
    return props[fetchingPropKey] ? (
      <div style={{ display: 'block', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    ) : (
      <ComposedComponent {...props} />
    );
  }
  return WrapperComponent;
};

export default loadingInjector;
