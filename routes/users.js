var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  const users=[{
    id: 1,
    name: "Jack",
    age: 30
  }];
  res.end(JSON.stringify(users));
});

module.exports = router;
