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

var response = {
 "query": {
  "count": 1,
  "created": "2015-05-27T05:27:26Z",
  "results": {
   "channel": {
    "location": {
     "city": "San Francisco",
     "country": "United States",
     "region": "CA"
    },
    "units": {
     "distance": "mi",
     "pressure": "in",
     "speed": "mph",
     "temperature": "F"
    },
    "wind": {
     "chill": "57",
     "direction": "250",
     "speed": "13"
    },
    "atmosphere": {
     "humidity": "77",
     "pressure": "30.02",
     "rising": "1",
     "visibility": "10"
    },
    "astronomy": {
     "sunrise": "5:50 am",
     "sunset": "8:19 pm"
    },
    "item": {
     "title": "Conditions for San Francisco, CA at 9:53 pm PDT",
     "lat": "37.75",
     "long": "-122.44",
     "pubDate": "Tue, 26 May 2015 9:53 pm PDT",
     "condition": {
      "code": "26",
      "date": "Tue, 26 May 2015 9:53 pm PDT",
      "temp": "57",
      "text": "Cloudy"
     },
     "forecast": [
      {
       "code": "26",
       "date": "26 May 2015",
       "day": "Tue",
       "high": "59",
       "low": "51",
       "text": "Cloudy"
      },
      {
       "code": "30",
       "date": "27 May 2015",
       "day": "Wed",
       "high": "61",
       "low": "52",
       "text": "AM Clouds/PM Sun"
      },
      {
       "code": "28",
       "date": "28 May 2015",
       "day": "Thu",
       "high": "61",
       "low": "52",
       "text": "Mostly Cloudy"
      },
      {
       "code": "30",
       "date": "29 May 2015",
       "day": "Fri",
       "high": "61",
       "low": "52",
       "text": "AM Clouds/PM Sun"
      },
      {
       "code": "28",
       "date": "30 May 2015",
       "day": "Sat",
       "high": "62",
       "low": "52",
       "text": "Mostly Cloudy"
      }
     ],
    }
   }
  }
 }
};

var rndemo = React.createClass({

  componentWillMount() {

  },

  getInitialState() {
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
    }
  },

  render: function() {
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
