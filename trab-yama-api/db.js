const mysql = require("mysql");

/*
O código abaixo cria uma conexão com o banco mysql
no schema 'yamagod', tendo como host o próprio localhost.
*/

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "yama",
  password: "1234",
  database: "yamagod"
});

con.connect(function(err) { // Tratamento de erro
  if (err) throw err;
});

module.exports = con; // Expondo a conexão
