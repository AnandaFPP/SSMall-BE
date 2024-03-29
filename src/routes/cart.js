const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");

router
  .get("/", cartController.getAllCart)
  .get("/:id", cartController.getDetailCart)
  .post("/", cartController.createCart)
  .delete("/:id", cartController.deleteCart);

module.exports = router;