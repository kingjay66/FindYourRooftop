var React = require('react-native');


class Badge extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={{uri: this.props.userInfo.avatar_url}} />
				<Text style={styles.name}>{this.props.userInfo.name}</Text>
				<Text style={styles.handle}>{this.props.userInfo.login}</Text>
			</View>
		);
	}
}

Badge.propsTypes = {
	userInfo: React.PropTypes.object.isRequired
};


const {
	Text,
	View,
	Image,
	StyleSheet
} = React;

let styles = StyleSheet.create({
	container: {
		backgroundColor: '#48BBEC',
		paddingBottom: 18
	},
	name: {
		alignSelf: 'center',
		fontSize: 21,
		marginTop: 18,
		marginBottom: 5,
		color: '#FFF'
	},
	handle: {
		alignSelf: 'center',
		fontSize: 16,
		color: '#FFF'
	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 65,
		marginTop: 18,
		alignSelf: 'center'
	}
});

module.exports = Badge;