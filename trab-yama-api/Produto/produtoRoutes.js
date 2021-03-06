const express = require("express");
const produtoBO = require("./produtoBO");

const router = express.Router();

/*
Neste arquivo, são criadas as rotas web de POST, PUT, DELETE e GET
cada uma delas possui um tratamento de erro que retorna
erros HTTP caso a requisição venha com erro.
Caso venha corretamente, chama a produtoBO que trata essas requsições.
*/

router.post("/", async (req, res) => { // Rota de POST
  produtoBO
    .insert(req.body)
    .then(
      data => {
        res
          .status(200)
          .send({ msg: "produto inserido com sucesso", result: data });
      },
      err => {
        res
          .status(400)
          .send({ msg: "problema ao inserir registro", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

router.delete("/", async (req, res) => { // Rota de DELETE
  produtoBO
    .delete(req.body.codigo)
    .then(
      data => {
        res
          .status(200)
          .send({ msg: "produto removido com sucesso", result: data });
      },
      err => {
        res
          .status(400)
          .send({ msg: "problema ao remover registro", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

router.get("/", async (req, res) => { // Rota de GET
  let { numero } = req.query;
  produtoBO
    .list(numero)
    .then(
      data => {
        res.status(200).send({ produtos: data });
      },
      err => {
        res.status(400).send({ msg: "problema ao listar produtos", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

router.put("/", async (req, res) => { // Rota de PUT
  produtoBO
    .alter(req.body)
    .then(
      data => {
        res
          .status(200)
          .send({ msg: "produto alterado com sucesso", result: data });
      },
      err => {
        res
          .status(400)
          .send({ msg: "problema ao alterar registro", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

module.exports = router; // Expondo o router
