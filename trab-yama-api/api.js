const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const produtoBO = require("./Produto/produtoBO");
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get("/", (req, res) => res.send("veja yama"));

app.listen(port, () => console.log(`veja ${port}!`));

app.get("/", function(req, res) {
  res.send(`estou de pé`);
});

produtoBO.insert();
