const produtoDao = require("./produtoDAO");

produtoBO = {
  insert: produto => {
    return produtoDao.insert(produto);
  },
  delete: codigo => {
    return produtoDao.delete(codigo);
  },
  list: numeroPedido => {
    return produtoDao.list(numeroPedido);
  },
  alter: produto => {
    return produtoDao.alter(produto);
  }
};

module.exports = produtoBO;
