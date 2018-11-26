const con = require("../db");

/*
O código abaixo funciona como um switch que, 
dependendod o método, chama a função desejada.
e.g: insert -> insertProduto()
*/

const produtoDao = {
  insert: produto => {
    return insertProduto(produto);
  },
  delete: id => {
    return deleteProduto(id);
  },
  list: numeroPedido => {
    if (numeroPedido) {
      return listProdutosPorPedido(numeroPedido);
    } else {
      return listProdutos();
    }
  },
  alter: produto => {
    return alterProduto(produto);
  }
};

/*
insertProduto recebe um produto e chama
a conexão com o banco passando o comando de insert 
com esse produto
*/
function insertProduto(produto) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO produto SET ?";
    con.query(sql, produto, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}


/*
deleteProduto recebe um código e chama
a conexão com o banco passando o comando de delete 
com esse código
*/
function deleteProduto(codigo) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM produto WHERE codigo = '${codigo}'`;
    con.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}


/*
listProduto chama o banco com o comando
de select *, que retorna todos os produtos cadastrados
*/
function listProdutos() {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM produto", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}


/*
listProdutoPorPedido chama o banco com o comando
de select *, com um join entre tabelas de pedidos e produtos
que retorna todos os produtos cadastrados que existem
para um pedido cadastrado
*/
function listProdutosPorPedido(numeroPedido) {
  return new Promise((resolve, reject) => {
    con.query(
      "select pb.*, produto.* from pedido_produto as pb inner join produto on produto.codigo = pb.codigo_produto where pb.numero_pedido = ?",
      numeroPedido,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

/*
alterProduto recebe um produto e chama o banco com o comando
de update, alterando uma entrada em que o código do produto seja
igual ao do produto recebido
*/
function alterProduto(produto) {
  return new Promise((resolve, reject) => {
    con.query(
      "UPDATE produto SET ? WHERE codigo = ?",
      [produto, produto.codigo],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

module.exports = produtoDao; // Expondo o produtoDAO
