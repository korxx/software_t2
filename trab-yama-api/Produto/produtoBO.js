const produtoDao = require("./produtoDAO");

produtoBO = {
  insert: produto => produtoDao.insert(produto),
  delete: codigo => produtoDao.delete(codigo),
  list: () => {
    return produtoDao.list();
  },
  alter: produto => produtoDao.alter(produto)
};

module.exports = produtoBO;
