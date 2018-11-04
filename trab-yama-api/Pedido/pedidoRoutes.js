const express = require("express");
const pedidoBO = require("./pedidoBO");

const router = express.Router();

router.post("/", async (req, res) => {
  pedidoBO
    .insert(req.body)
    .then(
      data => {
        res
          .status(200)
          .send({ msg: "pedido inserido com sucesso", result: data });
      },
      err => {
        res.status(400).send({ msg: "problema ao inserir pedido", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

router.delete("/", async (req, res) => {
  pedidoBO
    .delete(req.body.numero)
    .then(
      data => {
        res
          .status(200)
          .send({ msg: "pedido removido com sucesso", result: data });
      },
      err => {
        res.status(400).send({ msg: "problema ao remover pedido", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

router.get("/", async (req, res) => {
  pedidoBO
    .list()
    .then(
      data => {
        res.status(200).send({ pedido: data });
      },
      err => {
        res.status(400).send({ msg: "problema ao listar pedidos", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

router.put("/", async (req, res) => {
  pedidoBO
    .then(
      data => {
        res
          .status(200)
          .send({ msg: "pedido alterado com sucesso", result: data });
      },
      err => {
        res.status(400).send({ msg: "problema ao alterar pedido", erro: err });
      }
    )
    .catch(err => res.status(500).send(err));
});

module.exports = router;
