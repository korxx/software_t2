const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "yama",
  password: "1234",
  database: "yamagod"
});

module.exports = con;
