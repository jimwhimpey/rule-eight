import React, { Component } from 'react';

var iconToEmoji = function(icon) {
	var map = {
		'clear-day': '☀️',
		'clear-night': '☀️',
		'rain': '🌧',
		'snow': '🌨',
		'sleet': '🌨',
		'wind': '💨',
		'fog': '☁️',
		'cloudy': '☁️',
		'partly-cloudy-day': '⛅️',
		'partly-cloudy-night': '⛅️',
		'hail': '🌨',
		'thunderstorm': '⛈',
		'tornado': '🌪'
	};
	return (map[icon]) ? map[icon] : '⛅️';
};

class WeatherUnit extends Component {

	constructor(props) {
		super(props);
		this.state = props.data;
	}

	render() {
		if (this.state.apparentTemperatureMin && this.state.apparentTemperatureMax) {
			return (<ul>
				<li>{this.state.summary}</li>
				<li>Min: {this.state.apparentTemperatureMin}</li>
				<li>Max: {this.state.apparentTemperatureMax}</li>
				<li>Rain chance: {this.state.precipProbability}</li>
				<li>Wind dir: {this.state.windBearing}</li>
				<li>Wind dir: {this.state.windSpeed}</li>
			</ul>);
		} else {
			return (<ul>
				<li>{this.state.summary}</li>
				<li>{iconToEmoji(this.state.icon)}</li>
				<li>Temp: {this.state.apparentTemperature}</li>
				<li>Rain chance: {this.state.precipProbability}</li>
				<li>Wind dir: {this.state.windBearing}</li>
				<li>Wind dir: {this.state.windSpeed}</li>
			</ul>);
		}
	}

}

export default WeatherUnit;
