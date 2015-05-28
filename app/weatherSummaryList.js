'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ListView,
} = React;

var WeatherSummaryListItem = require('./weatherSummaryListItem');

var WeatherSummaryList = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.dataSource),
    };
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData, section, row) => <WeatherSummaryListItem {...rowData} row={row} />}
      />
    );
  }
});

module.exports = WeatherSummaryList;
