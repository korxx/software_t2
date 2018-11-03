const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const produtoRoutes = require("./Produto/produtoRoutes");
const pedidoRoutes = require("./Pedido/pedidoRoutes");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.listen(port, () => console.log(`ouvindo ${port}!`));
app.use("/produto", produtoRoutes);
app.use("/pedido", pedidoRoutes);
