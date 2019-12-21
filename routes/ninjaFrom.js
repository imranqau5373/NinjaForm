var express = require('express');
var router = express.Router();
var request = require("request");

router.post('/AddMember',function(req,res,next){
    if(req.body.MemberShip == "associate")
    req.body.MemberShipId = '1109927';
else
    req.body.MemberShipId = '1109926';
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
           'MembershipLevel.Id': req.body.MemberShipId,
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

module.exports = router;