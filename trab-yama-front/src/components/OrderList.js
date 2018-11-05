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
  TextField,
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const API = 'http://localhost:3001/';

class OrderList extends Component {
  state = {
    numero: 0,
    listaProdutos: '',
    listaProducts: '',
    open: false,
    openUpdate: false,
    loading: true,
    posts: [],
    data_pedido: 'AAAA-MM-dd',
    nome_cliente: 'Nome',
  };

  componentDidMount() {
    this.getOrders();
  }
  
  deleteOrder(order) {
    if (window.confirm(`Certeza que quer deletar o pedido "${order.numero}"`)) {
      this.fetch('DELETE', 'pedido', order)
    }
    this.getOrders()
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleOpen = () => {
     this.setState({ open: true });     
   };

   handleClose = () => {
     this.setState({ open: false });
   };
   
   postOrder = () => {
     let order = {
       listaProducts: this.state.listaProducts,
       data_pedido: this.state.data_pedido,
       nome_cliente: this.state.nome_cliente,
     }
  
    order.listaProducts = order.listaProducts.split(" ");
    let arrayRetorno = []
    for (let i = 0; i <order.listaProducts.length-1;i++){
      let x = []
      x.push(order.listaProducts[i])
      x.push(order.listaProducts[i+1])
      i++
      arrayRetorno.push(x)
    }
    
    console.log(arrayRetorno)
    
    let orderToPost = {
      listaProdutos : arrayRetorno,
      data_pedido: this.state.data_pedido,
      nome_cliente: this.state.nome_cliente,
    }
    
    console.log(orderToPost)
     this.fetch('POST','pedido', orderToPost)
     
     this.setState(
       {
         listaProducts: '',
         open: false,
         data_pedido: '',
         nome_cliente: 'Nome',
       }
     )
     this.getOrders()
   }

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
  
  updateOrder(pedido) {
    this.setState(
      {
        openUpdate: true,
        numero: pedido.numero,
        data_pedido: pedido.data_pedido,
        nome_cliente: pedido.nome_cliente,
      }
    )
  }
  
  
  putOrder = () => {
    let order = {
      numero: this.state.numero,
      data_pedido: this.state.data_pedido,
      nome_cliente: this.state.nome_cliente,
    }
    this.fetch('PUT','pedido', order)
    
    this.setState(
      {
        openUpdate: false,
        data_pedido: '',
        nome_cliente: 'Nome',
        numero: 0,
      }
    )
    this.getOrders()
  }
  
  render() {
    const { classes } = this.props;
    return (
        <Fragment>
          <Typography variant="display1">Pedidos</Typography>
          {this.state.posts.length > 0 ? (
            <Paper elevation={1} className={classes.posts}>
              <List>
                {orderBy(this.state.posts, ['numero'], ['asc']).map(pedido => (
                  <ListItem key={pedido.numero} button onClick={() => this.updateOrder(pedido)}>
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
              <div style={this.getModalStyle()} className={classes.paper}>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="standard_date"
                    label="Data do pedido"
                    className={classes.textField}
                    name="data_pedido"
                    value={this.state.data_pedido}
                    margin="normal"
                    onChange={this.handleChange('data_pedido')}
                  />
                  <TextField
                    id="standard_name"
                    label="Nome"
                    name="nome_cliente"
                    value={this.state.nome_cliente}
                    className={classes.textField}
                    onChange={this.handleChange('nome_cliente')}
                    margin="normal"
                  />
                  <TextField
                    id="standard_lista"
                    label="Lista"
                    name="listaProducts"
                    value={this.state.listaProducts}
                    className={classes.textField}
                    onChange={this.handleChange('listaProducts')}
                    margin="normal"
                  />
                  <Button onClick={this.postOrder}>
                    Cadastrar!
                  </Button>
                </form>
              </div>
            </Modal>
            
            
            <Modal
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description"
             open={this.state.openUpdate}
             onClose={this.handleClose}
             >
               <div style={this.getModalStyle()} className={classes.paper}>
                 <form className={classes.container} noValidate autoComplete="off">
                   <TextField
                     id="standard_date"
                     label="Data do pedido"
                     className={classes.textField}
                     name="data_pedido"
                     value={this.state.data_pedido}
                     margin="normal"
                     onChange={this.handleChange('data_pedido')}
                   />
                   <TextField
                     id="standard_name"
                     label="Nome"
                     name="nome_cliente"
                     value={this.state.nome_cliente}
                     className={classes.textField}
                     onChange={this.handleChange('nome_cliente')}
                     margin="normal"
                   />
                   <Button onClick={this.putOrder}>
                     Atualizar!
                   </Button>
                 </form>
               </div>
             </Modal>
            
        </Fragment>  
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(OrderList);