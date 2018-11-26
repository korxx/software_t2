const produtoDao = require("./produtoDAO");

/*
Seguindo o padrão de arquitetura, a produtoBO é chamada
com um tipo de requisição e, dependendo do tipo, chama
os métodos presentes na classe DAO com o respectivo dado
e.g: ao receber um delete -> chama a produtoDAO com o código
*/

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
