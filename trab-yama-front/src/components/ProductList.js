import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, withRouter, Redirect, Route, Link } from "react-router-dom";

import {
  withStyles,
  Button,
  Typography,
  IconButton,
  Paper,
  List,
  Modal,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
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

const API = 'http://localhost:3006/';

class ProductList extends Component {
  state = {
    open: false,
    loading: true,
    posts: [],
    descricao: 'Nome do produto',
    preco: 0,
  };

  componentDidMount() {
    this.getProducts();
  }
  
  deleteProduct(product) {
    if (window.confirm(`Certeza que quer deletar o produto "${product.descricao}"`)) {
      this.fetch('DELETE', 'produto', product)
    }
    this.getProducts()
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
   
   postProduct = () => {
     let product = {
       descricao: this.state.descricao,
       preco: this.state.preco,
     }
     console.log(product)
     this.fetch('POST','produto',product)
     
     this.setState(
       {
         open: false,
         descricao: 'Nome do produto',
         preco: 0,
       }
     )
     this.getProducts()
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
   
  async getProducts() {
    this.setState({ loading: false, posts: await this.fetch('get', 'produto') });
  }
  
  
  render() {
    const { classes } = this.props;
    return (
        <Fragment>
          <Typography variant="display1">Produtos</Typography>
          {this.state.posts.length > 0 ? (
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
                      <IconButton onClick={() => this.deleteProduct(product)} color="inherit">
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
                    id="standard-name"
                    label="Descrição"
                    className={classes.textField}
                    name="descricao"
                    value={this.state.descricao}
                    margin="normal"
                    onChange={this.handleChange('descricao')}
                  />
                  <TextField
                    id="standard-value"
                    label="Valor"
                    name="preco"
                    value={this.state.preco}
                    className={classes.textField}
                    onChange={this.handleChange('preco')}
                    margin="normal"
                  />
                  <Button onClick={this.postProduct}>
                    Cadastrar!
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
)(ProductList);