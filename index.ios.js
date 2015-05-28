/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var moment = require('moment');

var WeatherDetail = require('./app/weatherDetail');
var WeatherSummaryList = require('./app/weatherSummaryList');

var rndemo = React.createClass({

  componentWillMount() {
    fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22San%20Francisco%2C%20CA%22)&format=json')
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState(this.processResponse(responseJSON));
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  processResponse(response) {
    var results = response.query.results;
    var item = results.channel.item;
    var units = results.channel.units;
    var weekSummary = item.forecast.map(function(forcastItem, i) {
      return {
        conditionCode: forcastItem.code,
        date: moment(forcastItem.date, 'DD MMM YYYY').format('dddd'),
        high: forcastItem.high + '°',
        low: forcastItem.low + '°',
        description: forcastItem.text,
      };
    });

    return {
      current: {
        conditionCode: item.condition.code,
        date: item.condition.date,
        temp: item.condition.temp + '°',
        description: item.condition.text,
        location: results.channel.location.city + ', ' + results.channel.location.region,
      },
      weekSummary: weekSummary,
    };
  },

  render: function() {

    if (!this.state) {
      return (<Text>Loading...</Text>);
    }

    return (
      <View style={styles.container}>
        <WeatherDetail
          {...this.state.current}
        />
        <WeatherSummaryList
          dataSource={this.state.weekSummary}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: 20,
  },
});

AppRegistry.registerComponent('rndemo', () => rndemo);
