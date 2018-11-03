const express = require("express");
const produto = require("./pedidoBO");

const router = express.Router();

router.post("/", (req, res) => {
  res.send("About birds");
});

router.delete("/", (req, res) => {
  res.send("Birds home page");
});

router.get("/", (req, res) => {
  res.send("About birds");
});

router.put("/", (req, res) => {
  res.send("About birds");
});

module.exports = router;
