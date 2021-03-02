var express = require("express");
var router = express.Router();
var userModel = require("../models/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  const users = userModel.getAllUsers();
  res.end(JSON.stringify(users));
});

module.exports = router;
