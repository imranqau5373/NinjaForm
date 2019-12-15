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
       'Content-Length': '122',
       'Accept-Encoding': 'gzip, deflate',
       Host: 'api.wildapricot.org',
       'Postman-Token': 'd57eb1cd-9c6a-45b7-a854-53d278dcd41d,5e362927-950a-470b-9db9-0faae98d6018',
       'Cache-Control': 'no-cache',
       'User-Agent': 'PostmanRuntime/7.20.1',
       'Content-Type': 'application/x-www-form-urlencoded',
       Authorization: 'Bearer 5ixKfwVB5xUnP-J7Lchl6-gYMAo-',
       Accept: 'application/json' },
    form: 
     { Email: 'newtest5@im.com',
       FirstName: 'first test5',
       LastName: 'last test 5',
       'MembershipLevel.Id': '1109926',
       MembershipEnabled: 'true' } };
  
console.log('contact data is working.')
console.log(options.form);
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      console.log('after wil api requst.');
      res.json('It is working now.');
    });
  })
});






module.exports = router;
