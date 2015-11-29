var React = require('react-native');

const {
	View,
	WebView,
	StyleSheet
} = React;

class Web extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<WebView url={this.props.url} />
			</View>
		);
	}
}

Web.propTypes = {
	url: React.PropTypes.string.isRequired
};

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F6F6EF',
		flexDirection: 'column'
	}
});

module.exports = Web;