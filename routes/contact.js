var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.post('/AddContact', function(req, res, next) {


});

router.get('/gettoken', function(req, res, next) {
    const oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
  
    const api_key = '7sa44nulzkbzljll8u182s89xioka5';
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
      res.json(body);
    });

});

module.exports = router;
