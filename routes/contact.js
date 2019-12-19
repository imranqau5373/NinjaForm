var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');

/* GET users listing. */
router.post('/addcontact', function(req, res, next) {
    fs.readFile('token.txt', 'utf8', function(err, token) {
        var options = { method: 'POST',
        url: 'https://api.wildapricot.org/v2/accounts/307033/Contacts/',
        headers:
         { 'cache-control': 'no-cache',
           Connection: 'keep-alive',
           'Content-Length': '72',
           'Accept-Encoding': 'gzip, deflate',
           Host: 'api.wildapricot.org',
           'Postman-Token': '454a8e75-ad75-4e3c-9943-99c9c5928b5c,9b99ddf4-af7f-4432-a9c6-8299f56cff91',
           'Cache-Control': 'no-cache',
           'User-Agent': 'PostmanRuntime/7.20.1',
           'Content-Type': 'application/x-www-form-urlencoded',
           Authorization: 'Bearer ' + token,
           Accept: 'application/json' },
        form:
         {
           Email: req.Email,
           FirstName: req.FirstName,
           LastName: req.LastName
         }
         };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log('save contact response');
        console.log(body);
        res.json(body);
        });
    });

});

router.get('/gettoken', function(req, res, next) {
    var oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
  
    var api_key = '7sa44nulzkbzljll8u182s89xioka5';
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
