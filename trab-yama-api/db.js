const mysql = require("mysql");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "yama",
  password: "1234",
  database: "yamagod"
});

con.connect(function(err) {
  if (err) throw err;
});

module.exports = con;
