const con = require("../db");

const produtoDao = {
  insert: produto => {
    return insertProduto(produto);
  },
  delete: id => {
    return deleteProduto(id);
  },
  list: () => {
    return listProdutos();
  },
  alter: produto => {
    return alterProduto(produto);
  }
};

function insertProduto(produto) {
  return new Promise(resolve => {
    let sql = "INSERT INTO produto SET ?";
    con.query(sql, produto, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

function deleteProduto(codigo) {
  return new Promise(resolve => {
    let sql = `DELETE FROM produto WHERE codigo = '${codigo}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

function listProdutos() {
  return new Promise(resolve => {
    con.query("SELECT * FROM produto", (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

function alterProduto(produto) {
  return new Promise(resolve => {
    con.query(
      "UPDATE produto SET ? WHERE codigo = ?",
      [produto, produto.codigo],
      (err, result) => {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

module.exports = produtoDao;
