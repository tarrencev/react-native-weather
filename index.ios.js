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
  StatusBarIOS,
} = React;

var moment = require('moment');
var LocationManager = require('NativeModules').LocationManager;
var WeatherDetail = require('./app/weatherDetail');
var WeatherSummaryList = require('./app/weatherSummaryList');

var rndemo = React.createClass({

  componentWillMount() {
    StatusBarIOS.setStyle(1);
    this.getLocation((error, response) => {
      this.fetchWeather(response.locality, response.region);
    });
  },

  render() {

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

  fetchWeather(city, state) {
    var encodedLocation = encodeURIComponent('"' + city + ',' + state + '"');
    fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D' + encodedLocation + ')&format=json')
      .then((response) => response.json())
      .then((responseJSON) => this.processWeatherResponse(responseJSON))
      .then((parsedResponse) => this.setState(parsedResponse))
      .catch((error) => {
        console.warn(error);
      });
  },

  processWeatherResponse(response) {
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

  getLocation(callback) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        LocationManager.getLocationInfoFromCoords(
          position.coords.latitude,
          position.coords.longitude,
          callback
        );
      }
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
