var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  const oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
  const apiBaseUrl = 'https://api.wildapricot.org/v2/';
  
  const api_key = '7sa44nulzkbzljll8u182s89xioka5';
  const accountId = 307033;
  let contactData = req.body;
  console.log(new Buffer(`APIKEY:${api_key}`).toString('base64'));
  request.post(oauthTokenUrl, {
    form: {
      grant_type: 'client_credentials',
      scope: 'auto'
    },
    headers: {
       'content-type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
       "Authorization": "Basic " + new Buffer(`APIKEY:${api_key}`).toString('base64')
     },
    json: true
  }, function (err, wilres, body) {
    let accessToken = body.access_token;
    console.log('access token is working',accessToken);
    var options = { method: 'POST',
  url: 'https://api.wildapricot.org/v2/accounts/307033/Contacts/',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Content-Length': '61',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'api.wildapricot.org',
     'Postman-Token': '2f53ba2e-244a-41a8-857a-ab29f2c27b2d,5fd39c14-ef1f-41c2-b9d7-ad8a12273d50',
     'Cache-Control': 'no-cache',
     'User-Agent': 'PostmanRuntime/7.20.1',
     'Content-Type': 'application/x-www-form-urlencoded',
     Authorization: 'Bearer '+accessToken,
     Accept: 'application/json' },
  form: 
   { Email: contactData.Email,
     FirstName: contactData.FirstName,
     LastName: contactData.LastName,

   } 
  };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      console.log('after wil api requst.');
      res.json('It is working now.');
    });
  })

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
    var accessToken = body.accessToken;
    var accountId = body.Permissions;
    console.log(accessToken);
    console.log(accountId);
    res.json('it is working now.');
  });
});






module.exports = router;
