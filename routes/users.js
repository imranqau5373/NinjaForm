var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/NinjaForm', function(req, res, next) {
  var options = { method: 'POST',
  url: 'https://oauth.wildapricot.org/auth/token',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Content-Length': '40',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'oauth.wildapricot.org',
     'Postman-Token': '0120cde3-3530-44e3-9c58-dfb6a0f94b2b,0ec0cc23-3db9-43a5-99a3-d830b6e1a88d',
     'Cache-Control': 'no-cache',
     'User-Agent': 'PostmanRuntime/7.20.1',
     Authorization: 'Basic QVBJS0VZOjdzYTQ0bnVsemtiemxqbGw4dTE4MnM4OXhpb2thNQ==',
     Accept: 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: { grant_type: 'client_credentials', scope: 'auto' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  

  console.log(body);
});
});






module.exports = router;
