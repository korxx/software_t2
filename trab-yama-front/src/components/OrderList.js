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

class OrderList extends Component {
  state = {
    loading: true,
    posts: [],
  };

  componentDidMount() {
    this.getOrders();
  }
  
  deleteOrder(order) {
    if (window.confirm(`Certeza que quer deletar o produto "${order.descricao}"`)) {
      this.fetch('DELETE', 'pedido', order)
    }
    this.getOrders()
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

  async getOrders() {
    this.setState({ loading: false, posts: await this.fetch('get', 'pedido') });
  }
  
  render() {
    const { classes } = this.props;
    return (
        <Fragment>
          <Typography variant="display1">Pedidos</Typography>
          {this.state.posts.length > 0 ? (
            <Paper elevation={1} className={classes.posts}>
              <List>
                {orderBy(this.state.posts, ['descricao'], ['asc']).map(pedido => (
                  <ListItem key={pedido.numero} button component={Link} to={`pedido/${pedido.numero}`}>
                    <ListItemText>
                      <p><h4>Número: </h4>{pedido.numero}</p>
                      <p><h4>Data do pedido: </h4>{pedido.data_pedido}</p>
                      <p><h4>Cliente: </h4>{pedido.nome_cliente}</p>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.deleteOrder(pedido)} color="inherit">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            !this.state.loading && <Typography variant="subheading">Nenhum pedido cadastrado</Typography>
          )}
        </Fragment>  
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(OrderList);