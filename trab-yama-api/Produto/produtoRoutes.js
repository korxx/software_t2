const express = require("express");
const produtoBO = require("./produtoBO");

const router = express.Router();

router.post("/", async (req, res) => {
  let result = await produtoBO
    .insert(req.body)
    .catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

router.delete("/", async (req, res) => {
  let result = await produtoBO
    .delete(req.body.codigo)
    .catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

router.get("/", async (req, res) => {
  let result = await produtoBO.list().catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  let result = await produtoBO
    .alter(req.body)
    .catch(err => res.status(400).send(err));
  res.status(200).send(result);
});

module.exports = router;
