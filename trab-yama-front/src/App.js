import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";


import Header from './components/Header.js';
import ProductList from './components/ProductList.js';
import OrderList from './components/OrderList.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/pedido" component={OrderList} />
          <Route exact path="/produto" component={ProductList} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
