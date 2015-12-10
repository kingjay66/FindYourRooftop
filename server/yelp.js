var Yelp = require('yelp');
// var config = require('../config.js');
// console.log(process.env.YELP);
// var config_yelp = process.env.YELP || config.;
// var yelp = new Yelp(process.env.YELP);
// var yelp = new Yelp({
//   consumer_key: 'QfssABWRjYQulw4wvMx7kQ',
//   consumer_secret: '82PKYE32zGwYsqKd5UGiedWE7L0',
//   token: '1ei2Ny4uKw-TaE8ZOfkGwwUyjyIrGE0h',
//   token_secret: 'tYUurnVyxQAC5p-dwDKDIlPdfA8',
// });
var yelp = new Yelp({
  consumer_key: process.env.yelp_consumer_key,
  consumer_secret: process.env.yelp_consumer_secret,
  token: process.env.yelp_token,
  token_secret: process.env.yelp_token_secret, 
});
// var yelp = new Yelp(config_yelp);

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.callYelpApi = function(req, res, next){
  console.log(yelp);
  var barData =[];
  console.log('yelp.js -- req.body: ' + JSON.stringify(req.body, null, 2));
  yelp.search(req.body)
  .then(function (data) {
    console.log('BUSINESSES ARE ' + data.businesses[0].location.address)
    for(var i=0; i < data.businesses.length; i++) {
      barData.push(data.businesses[i])
    }
    res.data = barData;
    next();
  }).catch(function (err) {
    console.error(err);
  });
};

