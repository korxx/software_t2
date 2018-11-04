import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import AppHeader from './components/AppHeader';
import ProductManager from './pages/ProductManager';
import OrderManager from './pages/OrderManager';


const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Router>
      <Fragment>
        <CssBaseline />
        <AppHeader />
        <main className={classes.main}>
          <Route exact path="/pedidos" component={OrderManager} />
          <Route exact path="/produtos" component={ProductManager} />
        </main>
      </Fragment>
  </Router>
);

export default withStyles(styles)(App);
