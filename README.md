# software_t2
Trabalho de Construção de Software


END POINTS

get /pedido, lista todos pedidos

delete /pedido + body = {"numero": 1}, delete o pedido de numero 1 e suas ligações na tabela pedido_produto

put /pedido + body = {"numero":1, "data_pedido": "2018-02-02", "nome_cliente": "yama"}, altera o pedido de numero 1 para ter as propriedades enviadas

post /pedido + body = {"data_pedido": "2018-02-02", "nome_cliente": "yama", listaProdutos =  [[2,2], [3,5]]}, insere um pedido com uma lista de produtos onde a primeira posição do array é o codigo do produto e a segunda é a quantidade

get /produto?numero=1, lista todos produtos do pedido de numero 1

get /produto, lista todos produtos

delete /produto + body = {"codigo": 1}, deleta o produto de codigo 1 caso ele não esteja em nenhum pedido

put /produto + body = {"codigo": 1, "descricao": "produto x", "preco": 20}, altera o produto de codigo 1 para ter as propriedades enviadas

post /produto + body  = { "descricao": "produto x", "preco": 20 }, insere um produto
