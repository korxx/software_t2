import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';


const styles = {
  flex: {
    flex: 1,
  },
};

const Header = ({ classes }) => (
  <Router>
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Crud do Yama
          </Typography>
          <Button color="inherit" component={Link} to="/produto">Produtos</Button>
          <Button color="inherit" component={Link} to="/pedido">Pedidos</Button>
          <div className={classes.flex} />
        </Toolbar>
      </AppBar>
    </Fragment>  
  </Router>
);

export default withStyles(styles)(Header)