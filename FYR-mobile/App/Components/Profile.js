var React = require('react-native');

const {
	AlertIOS,
	Text,
	View,
	StyleSheet,
	ScrollView
} = React;

// external Components
const Badge = require('./Badge.js');
const Separator = require('./Helpers/Separator.js');

class Profile extends React.Component {
	getRowTitle(user, item) {
		item = (item === 'public_repos') ? item.replace('_', ' ') : item;
		return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
	}
	render() {
		let userInfo = this.props.userInfo;
		let topicArr = ['company', 'location', 'blog', 'followers', 'following', 'email', 'bio', 'public_repos'];

    var list = topicArr.map((topic, idx) => {
    	if (!userInfo[topic]) {
    		return <View key={idx} />
    	}
    	return (
    		<View key={idx}>
    			<View style={styles.rowContainer}>
    				<Text style={styles.rowTitle}>{this.getRowTitle(userInfo, topic)}</Text>
    				<Text style={styles.rowContent}>{userInfo[topic]}</Text>
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

let styles = StyleSheet.create({
	container: {
		flex: 1
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	rowContainer: {
		padding: 10
	},
	rowTitle: {
		color: '#48BBEC',
		fontSize: 16
	},
	rowContent: {
		fontSize: 19
	}
});

module.exports = Profile;