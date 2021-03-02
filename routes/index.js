var express = require("express");
var router = express.Router();
var userModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  const users = userModel.getAllUsers();
  res.render("index", { title: "Express", users });
});

module.exports = router;
