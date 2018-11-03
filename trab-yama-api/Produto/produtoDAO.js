const con = require("../db");

const produtoDao = {
  insert: produto => {
    insertProduto(produto);
  },
  delete: id => {
    deleteProduto(id);
  },
  list: () => {
    return listProdutos();
  },
  alter: produto => {
    alterProduto(produto);
  }
};

function insertProduto(produto) {
  let sql = "INSERT INTO produto SET ?";
  con.query(sql, produto, (err, res) => {
    if (err) throw err;
    console.log("insert concluido", res);
  });
}

function deleteProduto(codigo) {
  let sql = `DELETE FROM produto WHERE codigo = '${codigo}'`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} registros deletados`);
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
  con.query(
    "UPDATE produto SET ? WHERE codigo = ?",
    [produto, produto.codigo],
    (err, result) => {
      if (err) throw err;
      console.log(result);
    }
  );
}

module.exports = produtoDao;
