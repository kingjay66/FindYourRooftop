var React = require('react-native');

const {
	AlertIOS,
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	ScrollView,
} = React;

// external Components
const Badge = require('./Badge.js');
const Separator = require('./Helpers/Separator.js');
const Web = require('./Helpers/Web.js');

class Repos extends React.Component {
	openPage(url) {
		this.props.navigator.push({
			component: Web,
			title: 'Web View',
			passProps: {url}
		});
	}
	render() {
		let repos = this.props.repos;
		let list = repos.map((item, idx) => {
			let desc = repos[idx].description ?
				<Text style={styles.description}>{repos[idx].description}</Text> :
				<View />
			return (
				<View key={idx}>
					<View style={styles.rowContainer}>
						<TouchableHighlight
							onPress={this.openPage.bind(this, repos[idx].html_url)}
							underlayColor="transparent">
							<Text style={styles.name}>{repos[idx].name}</Text>
						</TouchableHighlight>
						<Text style={styles.stars}>Stars: {repos[idx].stargazers_count}</Text>
						{desc}
					</View>
					<Separator />
				</View>
			);
		});
		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
				{list}
			</ScrollView>
		);
	}
}

Repos.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	repos: React.PropTypes.array.isRequired
};

let styles = StyleSheet.create({
	container: {
		flex: 1
	},
	description: {
		fontSize: 14,
		paddingBottom: 5
	},
	name: {
		color: '#48BBEC',
		fontSize: 18,
		paddingBottom: 5
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	rowContainer: {
		flexDirection: 'column',
		flex: 1,
		padding: 10
	},
	rowTitle: {
		color: '#48BBEC',
		fontSize: 16
	},
	rowContent: {
		fontSize: 19
	},
	stars: {
		color: '#48BBEC',
		fontSize: 14,
		paddingBottom: 5
	}
});

module.exports = Repos;