var React = require('react-native');

const {
	View,
	Text,
	ListView,
	TextInput,
	StyleSheet,
	TouchableHighlight
} = React;

const api = require('../Utils/api.js');

// external Components
const Separator = require('./Helpers/Separator.js');
const Badge = require('./Badge.js');

class Notes extends React.Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		// getInitialState
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.notes),
			note: '',
			error: ''
		};
	}
	handleChange(event) {
		this.setState({
			note: event.nativeEvent.text
		});
	}
	handleSubmit() {
		let note = this.state.note;
		this.setState({
			note: ''
		});
		api.addNote(this.props.userInfo.login, note)
		.then(data => {
			api.getNotes(this.props.userInfo.login)
			.then(data => {
				this.setState({
					dataSource: this.ds.cloneWithRows(data)
				});
			})
		})
		.catch(err => {
			console.error('Request failed...', err);
			this.setState({
				error: err
			});
		});
	}
	renderRow(rowData) {
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text>{rowData}</Text>
					<Separator />
				</View>
			</View>
		);
	}
	footer() {
		return (
			<View style={styles.footerContainer}>
				<TextInput
					style={styles.searchInput}
					value={this.state.note}
					onChange={this.handleChange.bind(this)}
					placeholder="New Note" />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="88D4F5">
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableHighlight>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={() => <Badge userInfo={this.props.userInfo} />} />
				{this.footer()}
			</View>
		);
	}
}

Notes.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	notes: React.PropTypes.object.isRequired
};

let styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	buttonText: {
		fontSize: 18,
		color: '#FFF'
	},
	button: {
		height: 68,
		backgroundColor: '#48BBEC',
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	searchInput: {
		height: 60,
		padding: 10,
		fontSize: 18,
		color: '#111',
		flex: 10
	},
	rowContainer: {
		padding: 10
	},
	footerContainer: {
		backgroundColor: '#E3E3E3',
		alignItems: 'center',
		flexDirection: 'row'
	}
});

module.exports = Notes;