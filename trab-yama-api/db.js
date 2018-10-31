const mysql = require("mysql");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "yama",
  password: "1234"
});

export default con;
