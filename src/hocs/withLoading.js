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

// TODO: loader ref
// ref2 = 'react-loader-advanced'
// const LoaderHOC = (propName) => (WrappedComponent) => {
//   return class LoaderHOC extends React.Component {
//     isEmpty(prop) {
//       return (
//         prop === null
//         || prop === undefined
//         || (Array.isArray(prop) && prop.lengh === 0)
//         || (prop.constructor === Object && Object.keys(prop).length === 0)
//       );
//     }
//     render() {
//       return (
//         this.isEmpty(this.props[propName])
//         ? <h1 className='loader'>Loading...</h1>
//         : <WrappedComponent {...this.props} />)
//     }
//   }
// }

// var AppHeader = function(props) {
//   return <h1>{props.headerText}</h1>;
// };

// var LoadingHeader = LoaderHOC('headerText')(AppHeader);

// class App extends React.Component {
//   state = { headerText: null };

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({headerText: "I am the app header"})
//     }, 3000)
//   }

//   render() {
//     return (
//       <LoadingHeader headerText={this.state.headerText} />
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));
