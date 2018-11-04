import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, withRouter, Redirect, Route, Link } from "react-router-dom";

import {
  withStyles,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import PostEditor from '../components/PostEditor';

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

class OrderManager extends Component {
  state = {
    loading: true,
    posts: [],
  };

  componentDidMount() {
    this.getPosts();
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
      return await response.JSON();
    } catch (error) {
      console.error(error);
    }
  }

  async getPosts() {
    this.setState({ loading: false, posts: await this.fetch('get', 'pedido') });
  }

  savePost = async (order) => {
    if (order.numero) {
      await this.fetch('put', `pedido/${order.numero}`, order);
    } else {
      await this.fetch('post', 'pedido', order);
    }

    this.props.history.goBack();
    this.getPosts();
  }

  async deletePost(order) {
    if (window.confirm(`Certeza que quer deletar o pedido "${order.descricao}"`)) {
      await this.fetch('delete', `pedido/${order.numero}`);
      this.getPosts();
    }
  }

  renderPostEditor = ({ match: { params: { numero } } }) => {
    if (this.state.loading) return null;
    const order = find(this.state.posts, { numero: Number(numero) });

    if (!order && numero !== 'new') return <Redirect to="pedido" />;

    return <PostEditor post={order} onSave={this.savePost} />;
  };

  render() {
    const { classes } = this.props;
    return (
        <Fragment>  
        <h1 onClick={() => this.getPosts()}> Beterraba </h1>
        
          <Typography variant="display1">Pedidos</Typography>
          {1 > 0 ? (
            <Paper elevation={1} className={classes.posts}>
              <List>
                {orderBy(this.state.posts, ['descricao'], ['asc']).map(order => (
                  <ListItem key={order.numero} button component={Link} to={`pedido/${order.numero}`}>
                    <ListItemText>
                    <p><h4>Código: </h4>{order.numero}</p>
                    <p><h4>Data: </h4>{order.data_pedido}</p>
                    <p><h4>Cliente: </h4>{order.nome_cliente}</p>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.deletePost(order)} color="inherit">
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
          <Button
            variant="fab"
            color="secondary"
            aria-label="add"
            className={classes.fab}
            component={Link}
            to="pedido/new"
          >
            <AddIcon />
          </Button>
          <Router>
            <Route exact path="pedido/:codigo" render={this.renderPostEditor} />
          </Router>
        </Fragment>  
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(OrderManager);
