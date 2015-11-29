const DB_ENDPOINT = 'https://crackling-heat-2550.firebaseio.com';
const SERVER_ADDRESS = 'http://8e5053d2.ngrok.io';


const api = {
	getResults: function() {
		const url = `${DB_ENDPOINT}/results.json`;
		return fetch(url).then(res => res.json());
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
			body: JSON.stringify(data)
		}).then(res => res.json());
	}
};

module.exports = api;