const con = require("../db");


/*
O código abaixo funciona como um switch que, 
dependendod o método, chama a função desejada.
e.g: insert -> insertPedido()
*/

const pedidoDao = {
  insert: pedido => {
    return insertPedido(pedido);
  },
  delete: id => {
    return deletePedido(id);
  },
  list: () => {
    return listPedido();
  },
  alter: pedido => {
    return alterPedido(pedido);
  },

  insetPedidoProduto: pedidoProduto => {
    return insertPedidoProduto(pedidoProduto);
  }
};

/*
insertPedido recebe um pedido e chama
a conexão com o banco passando o comando de insert 
com esse pedido
*/
function insertPedido(pedido) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO pedido SET ?";
    con.query(sql, pedido, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

/*
deletePedido recebe um número e chama
a conexão com o banco passando o comando de delete 
com esse número
*/
function deletePedido(numero) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM pedido WHERE numero = '${numero}'`;
    con.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}


/*
listPedido chama o banco com o comando
de select *, que retorna todos os pedidos cadastrados
*/
function listPedido() {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM pedido", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

/*
alterPedido recebe um pedido e chama o banco com o comando
de update, alterando uma entrada em que o número do pedido seja
igual ao do pedido recebido
*/
function alterPedido(pedido) {
  return new Promise((resolve, reject) => {
    con.query(
      "UPDATE pedido SET ? WHERE numero = ?",
      [pedido, pedido.numero],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

/*
insertPedidoProduto recebe um código de produto, um inteiro, e um número de pedido
dessa forma cadastra um produto e quantos foram comprados ao pedido. O exemplo 
de uso dessa função está no README.
*/
function insertPedidoProduto(pedidoProduto) {
  return new Promise((resolve, reject) => {
    con.query(
      "INSERT INTO pedido_produto (codigo_produto,quantidade,numero_pedido) VALUES ?",
      [pedidoProduto],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

module.exports = pedidoDao;
