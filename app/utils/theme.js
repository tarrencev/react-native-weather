'use strict';

var colors = [
	'#8e44ad',
	'#c0392b',
	'#2980b9',
	'#16a085',
];

module.exports = {
	getColor(index) {
		return colors[index % colors.length];
	},
};
