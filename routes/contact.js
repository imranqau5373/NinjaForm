var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');

function sayHi() {
    console.log('Hello');
  }

/* GET users listing. */
router.post('/addcontact', function(req, res, next) {
    fs.readFile('token.txt', 'utf8', function(err, token) {
      console.log(token);
        console.log('in add contact.');
    var options = { method: 'POST',
    url: 'https://api.wildapricot.org/v2/accounts/308042/Contacts/',
    form:
     {
       Email: req.body.Email,
       FirstName: req.body.FirstName,
       LastName: req.body.LastName,
    //    'MembershipLevel.Id': 1109926,
    //    MembershipEnabled: true
     },
     headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      "Authorization": "Bearer "+token
    },
   json: true
     };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log('save contact response');
    console.log(body);
    res.json(response);
    });
       
    });
    

});

router.get('/getAccessToken',function(req,res,next){
  console.log('get access token new.');
  var options = { method: 'POST',
  url: 'https://oauth.wildapricot.org/auth/token',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Content-Length': '86',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'oauth.wildapricot.org',
     'Postman-Token': '51dac561-4b75-4857-931d-6ad318eb7f45,40c68e98-92ba-4670-8b02-9411b609d5f3',
     'Cache-Control': 'no-cache',
     'User-Agent': 'PostmanRuntime/7.20.1',
     Authorization: 'Basic M3p6ajJvaHJvYjpuajBmc2EzbTBxbGNtY2liOXdvZXI5MTZtYTJhMjU=',
     Accept: 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: 
   { grant_type: 'password',
     username: 'imran.synergyit@gmail.com',
     password: 'imrankhan',
     scope: 'auto' } };

request(options, function (error, response, body) {
  fs.writeFile('token.txt', body.access_token, (err) => {
    console.log(body);
    res.json(response);
  });
});

});

router.post('/addNewTest',function(req,res,next){
  console.log('in add new contact.');
  var oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
  request.post(oauthTokenUrl, {
    form: 
    { grant_type: 'password',
      username: 'me@brianpersson.ca',
      password: 'o@N$588LBwBgojt7Hw2gdbhY$MbW45',
      scope: 'auto' },
    headers: {
       'content-type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
       "Authorization": "Basic cWlsdjA0MGd3OTpjaWYxMGZqenNkZWN5eWJ5YnVvNWx0cmRqNGMwbjc="
     },
    json: true
  }, function (err, wilres, body) {
        var options = { method: 'POST',
        url: 'https://api.wildapricot.org/v2/accounts/307033/Contacts/',
        form:
         {
           Email: req.body.Email,
           FirstName: req.body.FirstName,
           LastName: req.body.LastName,
           'MembershipLevel.Id': 1109926,
           MembershipEnabled: true
         },
         headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          "Authorization": "Bearer "+body.access_token
        },
       json: true
         };
      request(options, function (error, contactResponse, contactBody) {
        if (error) throw new Error(error);
        res.json(contactResponse);
        });
  
});

});

router.get('/gettoken', function(req, res, next) {
    var oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
    request.post(oauthTokenUrl, {
      form: 
      { grant_type: 'password',
        username: 'imran.synergyit@gmail.com',
        password: 'imrankhan',
        scope: 'auto' },
      headers: {
         'content-type': 'application/x-www-form-urlencoded',
         'Accept': 'application/json',
         "Authorization": "Basic M3p6ajJvaHJvYjpuajBmc2EzbTBxbGNtY2liOXdvZXI5MTZtYTJhMjU="
       },
      json: true
    }, function (err, wilres, body) {
              
      console.log(body.access_token);
        fs.writeFile('token.txt', body.access_token, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            console.log('token saved!');
        });

      res.json(body);
    });

});

module.exports = router;
