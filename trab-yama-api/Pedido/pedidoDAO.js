const con = require("../db");

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

function insertPedido(pedido) {
  return new Promise(resolve => {
    let sql = "INSERT INTO pedido SET ?";
    con.query(sql, pedido, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

function deletePedido(numero) {
  return new Promise(resolve => {
    let sql = `DELETE FROM pedido WHERE numero = '${numero}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

function listPedido() {
  return new Promise(resolve => {
    con.query("SELECT * FROM pedido", (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

function alterPedido(pedido) {
  return new Promise(resolve => {
    con.query(
      "UPDATE pedido SET ? WHERE numero = ?",
      [pedido, pedido.numero],
      (err, result) => {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

function insertPedidoProduto(pedidoProduto) {
  return new Promise(resolve => {
    con.query(
      "INSERT INTO pedido_produto (codigo_produto,quantidade,numero_pedido) VALUES ?",
      [pedidoProduto],
      (err, result) => {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

module.exports = pedidoDao;
