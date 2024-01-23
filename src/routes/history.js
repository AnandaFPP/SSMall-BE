const express = require("express");
const router = express.Router();
const historyController = require("../controller/history");

router
  .get("/", historyController.getAllHistory)
  .get("/:id", historyController.getDetailHistory)
  .post("/", historyController.createHistory)
  .delete("/:id", historyController.deleteHistory);

module.exports = router;