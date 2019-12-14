var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/NinjaForm', function(req, res, next) {
  console.log('contact form data.');
  var contactFromData = req.body;
  console.log(contactFromData);
  res.send('respond with a resource');
});

module.exports = router;
