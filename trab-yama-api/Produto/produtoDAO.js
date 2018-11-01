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
  let sql = `USE yamagod;
   INSERT INTO produto (descricao, preco)
   VALUES ('${produto.descricao}', ${produto.preco});`;
  console.log(sql);
  con.query(sql, (err, res) => {
    if (err) throw err;
    console.log("insert concluido", res);
  });
}

module.exports = produtoDao;
