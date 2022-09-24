var express = require('express');
var router = express.Router();

configFile = require('./include/config'); // import './include/config.js' (.js can be omitted) | 'configFile' was used because 'config' is a reserved command in another module.

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user page without HTML'+'<br><br>user: '+configFile.data.userName ); // You don't need a space before or after plus or equal signs.
});

module.exports = router;
