const express = require("express");
const pedidoBO = require("./pedidoBO");

const router = express.Router();

router.post("/", async (req, res) => {
  let result = await pedidoBO
    .insert(req.body)
    .catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

router.delete("/", async (req, res) => {
  let result = await pedidoBO
    .delete(req.body.numero)
    .catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

router.get("/", async (req, res) => {
  let result = await pedidoBO.list().catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  let result = await pedidoBO
    .alter(req.body)
    .catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

module.exports = router;
