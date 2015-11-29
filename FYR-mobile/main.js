'use strict';

const React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} = React;

// external Components
const Main = require('./App/Components/Main.js');

class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'FYR',
          component: Main
        }} />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  }
});

AppRegistry.registerComponent('main', () => App);
