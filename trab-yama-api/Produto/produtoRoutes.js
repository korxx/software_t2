const express = require("express");
const produtoBO = require("./produtoBO");

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req);
  produtoBO.insert(req.body);
  res.send("ok");
});

router.delete("/", (req, res) => {
  produtoBO.delete(req.body.codigo);
  res.send("ok");
});

router.get("/", async (req, res) => {
  let result = await produtoBO.list();
  res.send(result);
});

router.put("/", (req, res) => {
  produtoBO.alter(req.body);
  res.send("ok");
});

module.exports = router;
