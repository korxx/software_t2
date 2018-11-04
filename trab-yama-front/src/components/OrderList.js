import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, withRouter, Redirect, Route, Link } from "react-router-dom";

import {
  Button,
  withStyles,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  Modal,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';

import { orderBy } from 'lodash';
import { compose } from 'recompose';

const styles = theme => ({
  posts: {
    marginTop: 2 * theme.spacing.unit,
  },
  fab: {
    position: 'fixed',
    bottom: 3 * theme.spacing.unit,
    right: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      bottom: 2 * theme.spacing.unit,
      right: 2 * theme.spacing.unit,
    },
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const API = 'http://localhost:3006/';

class OrderList extends Component {
  state = {
    open: false,
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
  
  handleOpen = () => {
     this.setState({ open: true });     
   };

   handleClose = () => {
     this.setState({ open: false });
   };

   getModalStyle() {
     const top = 50 
     const left = 50

     return {
       top: `${top}%`,
       left: `${left}%`,
       transform: `translate(-${top}%, -${left}%)`,
     };
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
          
          <Button
           variant="fab"
           color="secondary"
           aria-label="add"
           className={classes.fab}
           onClick={this.handleOpen}
           >
            <AddIcon />
           </Button>
           
           <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            >
              <div style={this.getModalStyle()} className={classes.paper}><h1>Eminem</h1></div>
            </Modal>
            
        </Fragment>  
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(OrderList);