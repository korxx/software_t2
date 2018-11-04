const con = require("../db");

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

function insertProduto(produto) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO produto SET ?";
    con.query(sql, produto, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function deleteProduto(codigo) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM produto WHERE codigo = '${codigo}'`;
    con.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function listProdutos() {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM produto", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

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

module.exports = produtoDao;
