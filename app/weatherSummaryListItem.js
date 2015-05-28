'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var Theme = require('./utils/theme');

var WeatherSummaryListItem = React.createClass({

  render: function() {
    return (
      <View style={[styles.container, { backgroundColor: Theme.getColor(this.props.row)}]}>
        <View style={styles.dateContainer}>
          <Text style={styles.textBase}>
            {this.props.date}
          </Text>
        </View>
        <View>
          <Text style={styles.textBase}>
            High: {this.props.high} Low: {this.props.low}
          </Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  dateContainer: {
    flex: 1,
  },
  textBase: {
    color: '#ffffff',
  },
});

module.exports = WeatherSummaryListItem;
