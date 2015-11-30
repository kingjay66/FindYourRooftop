const React = require('react-native');

const {
	AlertIOS,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

// external Modules / Components
const STYLES = require('./Helpers/styles.js');
const api = require('../Utils/api.js');
const BarResults = require('./BarResults.js');
const SuggestionForm = require('./SuggestionForm.js');

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
			isLoading: false,
			error: false
		};
	}
	handleChange(event) {
		this.setState({
			searchQuery: event.nativeEvent.text
		});
	}
	handleSuggestion() {
		this.props.navigator.push({
			component: SuggestionForm,
			title: 'Suggest'
		});
	}
	handleSubmit() {
		// update our indicatorIOS spinner
		this.setState({
			isLoading: true
		});
		api.queryResults(this.state.searchQuery)
			.then(res => {
				if(!res) {
					this.setState({
						isLoading: false,
						error: 'No results found.'
					});
				} 
				else {
					this.props.navigator.push({
						title: `${res.length} results`,
						component: BarResults,
						passProps: {results: res}
					});
					this.setState({
						searchQuery: '',
						isLoading: false,
						error: false
					});
				}
			});
	}
	render() {
		let showError = (
			this.state.error ? <Text>{this.state.error}</Text> : <View></View>
		);
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}>
					Find a rooftop near you
				</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.searchQuery}
					onChange={this.handleChange.bind(this)} />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="#FFF">
					<Text style={styles.buttonText}>
						SEARCH
					</Text>
				</TouchableHighlight>
				<View style={styles.spinner}>
					<ActivityIndicatorIOS
						animating={this.state.isLoading}
						color="#111"
						size="large" />
				</View>
				{showError}
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSuggestion.bind(this)}
					underlayColor="#FFF">
					<Text style={styles.buttonText}>Make a suggestion</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 55,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: STYLES.primaryColor
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#FFF'
	},
	searchInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#FFF',
		borderRadius: 8,
		color: '#FFF'
	},
	spinner: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: '#FFF',
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	buttonText: {
		/* styles goes here */
	}
});

module.exports = Main;