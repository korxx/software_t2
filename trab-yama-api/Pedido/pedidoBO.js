const pedidoDao = require("./pedidoDAO");

pedidoBO = {
  insert: pedido => {
    return pedidoDao.insert(pedido);
  },
  delete: numero => {
    return pedidoDao.delete(numero);
  },
  list: () => {
    return pedidoDao.list();
  },
  alter: pedido => {
    return pedidoDao.alter(pedido);
  }
};

module.exports = pedidoBO;
