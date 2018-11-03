const produtoDao = require("./produtoDAO");

produtoBO = {
  insert: produto => {
    return produtoDao.insert(produto);
  },
  delete: codigo => {
    return produtoDao.delete(codigo);
  },
  list: () => {
    return produtoDao.list();
  },
  alter: produto => {
    return produtoDao.alter(produto);
  }
};

module.exports = produtoBO;
