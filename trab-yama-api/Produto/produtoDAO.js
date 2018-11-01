const con = require("../db");

const produtoDao = {
  insert: produto => {
    con.connect(err => {
      if (err) throw err;
      insertProduto(produto);
    });
  }
};

function insertProduto(produto) {
  let sql = "INSERT INTO produto SET ?";
  con.query(sql, produto, (err, res) => {
    if (err) throw err;
    console.log("insert concluido", res);
  });
}

module.exports = produtoDao;
