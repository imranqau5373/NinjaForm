var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.body.Email = 'testza1@im.com';
  req.body.FirstName = 'testza1';
  req.body.LastName = 'testza1';
  req.body.access_token = 'IrV-BH7-R-zLHtlbk-WWPOdJlbE-';
  callSaveContact(req);
  res.json('it is working.');

});


router.post('/Test', function(req, res, next) {
  postRequest('https://oauth.wildapricot.org/auth/token').then(function (body1) {
    console.log(body1);
    res.json(body1);
  })

});

router.get('/contact', function(req, res, next) {
  const oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
  
  const api_key = 'g9npihh79dei9ebpf3v1siictiqo7q';
  const accountId = 308042;
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
    console.log(body);
    wilres.body.Email = 'testza1@im.com';
    wilres.body.FirstName = 'testza1';
    wilres.body.LastName = 'testza1';
    callSaveContact(wilres);
    res.json(wilres.body.access_token);

  })

});

router.post('/TestForm', function(req, res, next) {
  var options = { method: 'POST',
  url: 'https://api.wildapricot.org/v2/accounts/308042/Contacts/',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Content-Length': '53',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'api.wildapricot.org',
     'Postman-Token': '18985b66-d8ed-441e-b360-627faa79cec9,83f2279b-548f-483f-9972-8b1298eceb29',
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     'User-Agent': 'PostmanRuntime/7.20.1',
     'Content-Type': 'application/x-www-form-urlencoded',
     Authorization: 'Bearer hIMDUh2h230abr2id7KD99UUiuY-' },
  form: 
   { Email: req.body.Email,
     FirstName: req.body.FirstName,
     LastName: req.body.LastName } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(response);
  res.json(body);
});
});


router.post('/NinjaForm', function(req, res, next) {
  const oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
  
  const api_key = 'g9npihh79dei9ebpf3v1siictiqo7q';
  const accountId = 307033;
  let contactData = req.body;
  console.log(contactData);
  if(contactData.MemberShip == "associate")
      contactData.MemberShipId = '1109927';
  else
      contactData.MemberShipId = '1109926';
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
    var options = { method: 'POST',
    url: 'https://api.wildapricot.org/v2/accounts/307033/Contacts/',
    headers: 
     { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       'Content-Length': '122',
       'Accept-Encoding': 'gzip, deflate',
       Host: 'api.wildapricot.org',
       'content-type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
       Authorization: 'Bearer '+wilres.body.access_token,
        },
    form: 
     { 
      Email: contactData.Email,
      FirstName: contactData.FirstName,
      LastName: contactData.LastName,
        // 'MembershipLevel.Id': 1109926,
        // MembershipEnabled: true 
    } };
    request(options, function (error, response, body) {
      if (error) 
      console.log(error);

      console.log(response);
      console.log('after wil api requst.');
      res.json(response);
    });
  })

});

function callSaveContact(req){
  let tokenNew = req.body.access_token;
  console.log(req.body.Email);
  console.log(tokenNew);
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
     Authorization: 'Bearer ' + tokenNew,
     Accept: 'application/json' },
  form:
   {
     Email: req.body.Email,
     FirstName: 'associte6',
     LastName: 'lastassociate6'
   }
   };
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
  });
}


function postRequest(url) {
  const api_key = '7sa44nulzkbzljll8u182s89xioka5';
  return new Promise(function (success, failure) {
    request.post(url, {
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
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        success(body);
    } else {
        failure(error);
    }

    })
  });
}

function createContact(url,accessToken,contactData) {
  return new Promise(function (success, failure) {
    var options = { method: 'POST',
    url: url,
    headers: 
     { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       'Content-Length': '122',
       'Accept-Encoding': 'gzip, deflate',
       Host: 'api.wildapricot.org',
       'content-type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
       Authorization: 'Bearer '+accessToken,
        },
    form: 
     { 
      Email: 'newassociate6@im.com',
      FirstName: 'associte6',
      LastName: 'lastassociate6',
        // 'MembershipLevel.Id': 1109926,
        // MembershipEnabled: true 
    } };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        success(body);
    } else {
        failure(error);
    }
    });

  });
}






module.exports = router;
