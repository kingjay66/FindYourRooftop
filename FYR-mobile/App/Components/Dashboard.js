var React = require('react-native');

var {
	AlertIOS,
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight
} = React;

const api = require('../Utils/api.js');

// external Components
const Profile = require('./Profile.js');
const Repos = require('./Repos.js');
const Notes = require('./Notes.js');

class Dashboard extends React.Component {
	makeBackground(btn) {
		var obj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		};

		switch (btn) {
			case 0:
				obj.backgroundColor = '#48BBEC';
				break;
			case 1:
				obj.backgroundColor = '#E77AAE';
				break;
			case 2:
				obj.backgroundColor = '#758BF4';
				break;
		}
		return obj;
	}
	goToProfile() {
		this.props.navigator.push({
			component: Profile,
			title: 'Profile',
			passProps: {userInfo: this.props.userInfo}
		});
	}
	goToRepos() {
		api.getRepos(this.props.userInfo.login)
		.then(res => {
			this.props.navigator.push({
				component: Repos,
				title: 'Repos',
				passProps: {userInfo: this.props.userInfo, repos: res}
			});
		})
	}
	goToNotes() {
		api.getNotes(this.props.userInfo.login)
		.then(res => {
			res = res || {};
			this.props.navigator.push({
				title: 'Notes',
				component: Notes,
				passProps: {
					notes: res,
					userInfo: this.props.userInfo
				}
			});
		})
	}
	render() {
		return (
			<View style={styles.container}>
			<Image 
				style={styles.image}
				source={{uri: this.props.userInfo.avatar_url}} />
				<TouchableHighlight
					style={this.makeBackground(0)}
					onPress={this.goToProfile.bind(this)}
					underlayColor="#88D4F5">
					<Text style={styles.buttonText}>View Profile</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(1)}
					onPress={this.goToRepos.bind(this)}
					underlayColor="#88D4F5">
					<Text style={styles.buttonText}>View Repos</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(2)}
					onPress={this.goToNotes.bind(this)}
					underlayColor="#88D4F5">
					<Text style={styles.buttonText}>View Notes</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		marginTop: 65,
		flex: 1
	},
	image: {
		height: 350
	},
	buttonText: {
		fontSize: 24,
		color: '#FFF',
		alignSelf: 'center'
	}
});

module.exports = Dashboard;