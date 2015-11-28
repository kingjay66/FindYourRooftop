var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'QfssABWRjYQulw4wvMx7kQ',
  consumer_secret: '82PKYE32zGwYsqKd5UGiedWE7L0',
  token: '1ei2Ny4uKw-TaE8ZOfkGwwUyjyIrGE0h',
  token_secret: 'tYUurnVyxQAC5p-dwDKDIlPdfA8',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.callYelpApi = function(){

  yelp.search({ term: 'misfit', limit: 2, location: 'Santa Monica' })
  .then(function (data) {
    // console.log(data);
    console.log(data.businesses[0].location);
  })
  .catch(function (err) {
    console.error(err);
  });

};

