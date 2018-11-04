import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";


import Header from './components/header.js';
import ProductList from './components/ProductList.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Fragment>
          <Header />
          // <Route exact path="/pedido" component={ProductList} />
          <Route exact path="/produto" component={ProductList} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
