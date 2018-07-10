import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout/Layout';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path ="/" component={Layout}/>
        <Route path="/login" component={() => (<h1>login</h1>)}/>
      </Fragment>
    );
  }
}

export default App;
