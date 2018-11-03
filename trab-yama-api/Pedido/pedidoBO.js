const pedidoDao = require("./pedidoDAO");

pedidoBO = {
  insert: pedido => {
    return insertPedido(pedido);
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

async function insertPedido(pedido) {
  let { listaProdutos } = pedido;
  delete pedido.listaProdutos;
  let { insertId } = await pedidoDao.insert(pedido);
  listaProdutos.map(produto => produto.push(insertId));
  return pedidoDao.insetPedidoProduto(listaProdutos);
}

module.exports = pedidoBO;
