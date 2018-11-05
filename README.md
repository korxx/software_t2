# Construção de Software - T2
<h3>Alunos</h3>
<p>Felipe Nunes, Luis Choma, Leonardo Vizzotto</p>

<h3>Problema</h3>
<p>Sistemas de informação de diversas áreas (comercial, acadêmica, pesquisa, entretenimento) envolvem, em sua maioria, a manipulação de dados em algum repositório de dados (bancos de dados, arquivos, etc.).<p>
<p>Esta manipulação é realizada, frequentemente, por meio de operacoes CRUD (criação, consulta, alteração e exclusão) de dados em um repositório de dados.<p>
<p>Recursos de interfaces gráficas com o usuário, tais como formulários com campos, botões, listas drop down, etc., normalmente utilizam as operações CRUD em aplicações.<p>
  
<h3>Trabalho</h3>
<ol>
  <li> Desenvolvimento de uma solução para reúso. 
    <p>A solução deve permitir a criação, consulta, alteração e exclusão de dados relacionados, tais como, relacionamentos N:N. O exemplo de uso deve demonstrar a execução das 4 operações a partir de uma interface gráfica.</p>
    <p>Entrega: 5/11/2018</p>
  </li>
  <li> Desenvolvimento de uma solução com reúso.
    <p>Entrega: 26/11/2018</p>
  </li>
</ol>

<hr>
<h3>Desenvolvimento</h3>
<h4>Solução: API</h4>
<h4>Tecnologia: JS</h4>

<h4>End Points</h4>
<hr>
<p>get /pedido</p> 
<p>Lista todos pedidos.</p>
<hr>
<p>delete /pedido + body = {"numero": 1}</p>
<p>Deleta o pedido de numero 1 e suas ligações na tabela pedido_produto.</p>

put /pedido + body = {"numero":1, "data_pedido": "2018-02-02", "nome_cliente": "yama"}, altera o pedido de numero 1 para ter as propriedades enviadas

post /pedido + body = {"data_pedido": "2018-02-02", "nome_cliente": "yama", listaProdutos =  [[2,2], [3,5]]}, insere um pedido com uma lista de produtos onde a primeira posição do array é o codigo do produto e a segunda é a quantidade

get /produto?numero=1, lista todos produtos do pedido de numero 1

get /produto, lista todos produtos

delete /produto + body = {"codigo": 1}, deleta o produto de codigo 1 caso ele não esteja em nenhum pedido

put /produto + body = {"codigo": 1, "descricao": "produto x", "preco": 20}, altera o produto de codigo 1 para ter as propriedades enviadas

post /produto + body  = { "descricao": "produto x", "preco": 20 }, insere um produto

<h4>Trello</h4>
<p>https://trello.com/b/HDnJaBCp/trabalho-do-yamaguti-o-bonzão</p>
