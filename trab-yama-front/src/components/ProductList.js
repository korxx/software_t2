import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, withRouter, Redirect, Route, Link } from "react-router-dom";

import {
  withStyles,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons';

import { orderBy } from 'lodash';
import { compose } from 'recompose';

const styles = theme => ({
  posts: {
    marginTop: 2 * theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: 3 * theme.spacing.unit,
    right: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      bottom: 2 * theme.spacing.unit,
      right: 2 * theme.spacing.unit,
    },
  },
});

const API = 'http://localhost:3006/';

class ProductList extends Component {
  state = {
    loading: true,
    posts: [],
  };

  componentDidMount() {
    this.getProducts();
  }
  
  deleteProducts() {
    console.log("TODO // Delete Products")
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts() {
    this.setState({ loading: false, posts: await this.fetch('get', 'produto') });
  }
  
  render() {
    const { classes } = this.props;
    return (
        <Fragment>
        
          <Typography variant="display1">Produtos</Typography>
          {this.state.posts != null ? (
            <Paper elevation={1} className={classes.posts}>
              <List>
                {orderBy(this.state.posts, ['descricao'], ['asc']).map(product => (
                  <ListItem key={product.codigo} button component={Link} to={`produto/${product.codigo}`}>
                    <ListItemText>
                    <p><h4>Código: </h4>{product.codigo}</p>
                    <p><h4>Descrição: </h4>{product.descricao}</p>
                    <p><h4>Valor: </h4>{product.preco}</p>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.deletePost(product)} color="inherit">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            !this.state.loading && <Typography variant="subheading">Nenhum produto cadastrado</Typography>
          )}
        </Fragment>  
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(ProductList);