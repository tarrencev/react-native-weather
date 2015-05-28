'use strict';

var React = require('react-native');
var { Image } = React;
var Images = require('./utils/images');

var WeatherConditionImage = React.createClass({

  render: function() {
    return (
      <Image
        style={this.props.dimensions}
        source={Images[this.props.conditionCode]}
      />
    );
  }
});

module.exports = WeatherConditionImage;
