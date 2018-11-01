const produtoDao = require("./produtoDAO");

produto = {
  descricao: "produto x",
  preco: "20"
};

produtoBO = {
  insert: () => produtoDao.insert(produto)
};

module.exports = produtoBO;
