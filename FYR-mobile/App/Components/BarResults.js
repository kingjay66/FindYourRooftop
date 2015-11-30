const React = require("react-native");

const {
	AlertIOS,
	View,
	Text,
	Image,
	ScrollView,
	TouchableHighlight,
	StyleSheet
} = React;

// external Components
const Separator = require('./Helpers/Separator.js');
const STYLES = require('./Helpers/styles.js');
const Web = require('./Helpers/Web.js');

class BarResults extends React.Component {
	formatAddress(address = 'No address available') {
		// this function ensures that address are at most 2 lines long
		if (!Array.isArray(address)) {
			return address;
		}
		return [].concat(address[0], address[2]);
	}
	openPage(url) {
		if (!url) {
			return AlertIOS.alert('Sorry', 'No website available...');
		}
		this.props.navigator.push({
			component: Web,
			title: 'In-App Browser',
			passProps: {url}
		});
	}
	render() {
		let results = this.props.results.map((result, idx) => {
			if (!result) {
				return <View />
			}
			// AlertIOS.alert('result', JSON.stringify(result, null, 2));
			let image = result.image_url || require('../Assets/placeholder.jpg');
			let formattedAddress = this.formatAddress(result.location.display_address);
			let address = formattedAddress.map(line => <Text style={styles.address}>{line}</Text>);
			return (
				<View>
					<TouchableHighlight
						onPress={this.openPage.bind(this, result.mobile_url)}
						underlayColor="transparent">
						<View key={idx} style={styles.barResult}>
							<View style={styles.barImage}>
								<Image
									style={styles.image}
									source={{uri: image}} />
							</View>
							<View style={styles.barInfo}>
								<Text style={styles.name}>
									{result.name}
								</Text>
								<View>
									{address}
								</View>
								<Text>{result.display_phone || 'no phone number'}</Text>
							</View>
						</View>
					</TouchableHighlight>
					<Separator />
				</View>
			);
		});
		return (
			<View style={styles.container}>
				<ScrollView>
					{results}
				</ScrollView>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		// marginTop: 65,
		flex: 1
	},
	barResult: {
		alignItems: 'center',
		// justifyContent: 'center',
		flexDirection: 'row',
		paddingTop: 5,
		paddingRight: 5,
		paddingLeft: 5,
		paddingBottom: 5
	},
	address: {
		flexDirection: 'column',
		fontSize: 12,
		color: '#888'
	},
	noAddress: {
		fontSize: 12,
		fontStyle: 'italic',
		color: '#AAA'
	},
	barImage: {
		flexDirection: 'column',
		marginRight: 10
	},
	barInfo: {
		flexDirection: 'column'
	},
	name: {
		fontSize: 14,
		color: STYLES.primaryColor,
		justifyContent: 'center',
		fontWeight: 'bold'
	},
	image: {
		height: 68,
		width: 68
	},
	buttonText: {
		fontSize: 24,
		color: '#FFF',
		alignSelf: 'center'
	}
});

module.exports = BarResults;