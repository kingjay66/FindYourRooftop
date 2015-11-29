var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'QfssABWRjYQulw4wvMx7kQ',
  consumer_secret: '82PKYE32zGwYsqKd5UGiedWE7L0',
  token: '1ei2Ny4uKw-TaE8ZOfkGwwUyjyIrGE0h',
  token_secret: 'tYUurnVyxQAC5p-dwDKDIlPdfA8',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.callYelpApi = function(req, res, next){
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

