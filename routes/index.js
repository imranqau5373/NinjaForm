var express = require('express');
var router = express.Router();
var request = require("request");
const oauthTokenUrl = 'https://oauth.wildapricot.org/auth/token';
const apiBaseUrl = 'https://api.wildapricot.org/v2/';
const accountId = 307033;
/* GET home page. */
router.get('/', function(req, response, next) {
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
}, function (err, res, body) {
  if( err) {
    console.error(err);
    throw err;
  }
  else {
    console.log('in request response.');
    listContacts(body.access_token, "zap");
    response.json('it is working.');
  }
});
});

function listContacts(authToken, searchString) {
  console.log('in list of contacts.');
  request.get(`${apiBaseUrl}/accounts/${accountId}/contacts`, {
      headers: {
        'Accept': 'application/json',
        "Authorization": `Bearer ${authToken}`
      },
      qs: {
        $async: false,
        $filter: `'First name' eq '${searchString}'`,
        $select: "'First name'"
      },
      json: true
    },
    function( err, res, body) {
      if( err) {
        console.error(err);
        throw err;
      }
      else {
        for (var i = 0; i < body.Contacts.length; i++) {
          let contact = body.Contacts[i];
          console.log(`${contact.DisplayName}: ${contact.Email}`);
        }
      }
    }
  );
}

router.get('/ninjaForm', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
