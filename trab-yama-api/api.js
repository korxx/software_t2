const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require("mysql");

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get("/", (req, res) => res.send("veja yama"));

app.listen(port, () => console.log(`veja ${port}!`));

app.get("/", function(req, res) {
  res.send(`estou de pé`);
});
