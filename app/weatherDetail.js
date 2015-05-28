'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var WeatherConditionImage = require('./weatherConditionImage');

var WeatherDetail = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <WeatherConditionImage
            dimensions={{width: 100, height: 100}}
            conditionCode={this.props.conditionCode}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.textBase, styles.textToday]}>
            TODAY
          </Text>
          <Text style={[styles.textBase, styles.textTemp]}>
            {this.props.temp}
          </Text>
          <Text style={[styles.textBase, styles.textDescription]}>
            {this.props.description}
          </Text>
          <Text style={[styles.textBase, styles.textLocation]}>
            {this.props.location}
          </Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
  },
  avatarContainer: {
    width: 200,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    marginTop: 25,
    marginLeft: 0,
  },
  textToday: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTemp: {
    fontSize: 28,
  },
  textDescription: {
    fontSize: 20,
  },
  textLocation: {

  },
  textBase: {
    color: '#ffffff',
  }
});

module.exports = WeatherDetail;
