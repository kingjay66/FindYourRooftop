const DB_ENDPOINT = 'https://crackling-heat-2550.firebaseio.com';
const SERVER_ADDRESS = 'http://0ca016e4.ngrok.io';

// helper functions
function isZipCode(string) {
	let re = /^[0-9]{5,5}$/;
	return re.test(string);
};

const api = {
	getResults: function() {
		const url = `${DB_ENDPOINT}/results.json`;
		return fetch(url).then(res => res.json());
	},
	queryResults: function(queryString) {
		let url = `${SERVER_ADDRESS}/home`;
		let data = {
			city: null,
			zipCode: null
		};
		if (isZipCode(queryString)) {
			data.zipCode = queryString;
		} else {
			data.city = queryString;
		}
		return fetch(url, {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(data)
			})
			.then(res => res.json());
	},
	getSuggestions: function() {
		const url = `${DB_ENDPOINT}/suggestions.json`;
		return fetch(url).then(res => res.json());
	},
	getUsers: function() {
		const url = `${DB_ENDPOINT}/users.json`;
		return fetch(url).then(res => res.json());
	},
	getYelpResults: function(suggestion) {
		return callYelpApi(suggestion);
	},
	addSuggestion: function(suggestion) {
		let url = `${SERVER_ADDRESS}/submission`;
		let data = {
			term: suggestion.name,
			location: suggestion.location,
			limit: 3
		};
		return fetch(url, {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(data)
			})
			.then(res => res.json());
	},
	pushSuggestionToDB: function(yelpObj) {
		let url = `${SERVER_ADDRESS}/admin`;
		return fetch(url, {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(yelpObj)
			})
			.then(res => res.json());
	}
};

module.exports = api;