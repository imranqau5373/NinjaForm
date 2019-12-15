var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.json('it is working.')

});

router.post('/TestForm', function(req, res, next) {
  console.log(req.body);
  res.json('it is working.')

});

router.post('/NinjaForm', function(req, res, next) {
  const oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
  const apiBaseUrl = 'https://api.wildapricot.org/v2/';
  
  const api_key = '7sa44nulzkbzljll8u182s89xioka5';
  const accountId = 307033;
  let contactData = req.body;
  if(contactData.MemberShip == "associate")
      contactData.MemberShipId = "1109927";
  else
      contactData.MemberShipId = "1109926";
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
     'MembershipLevel.Id': contactData.MemberShipId,
     MembershipEnabled : true

   } 
  };
console.log('contact data is working.')
console.log(contactData);
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      console.log('after wil api requst.');
      res.json('It is working now.');
    });
  })
});






module.exports = router;
