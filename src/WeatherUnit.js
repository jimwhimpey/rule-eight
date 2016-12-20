import React, { Component } from 'react';
import Wind from './Wind.js';

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
		this.state.units = props.units;
	}

	render() {
		if (this.state.apparentTemperatureMin && this.state.apparentTemperatureMax) {
			return (<ul>
				<li className="summary">{this.state.summary}</li>
				<li className="icon">{iconToEmoji(this.state.icon)}</li>
				<li className="min_temp"><span className="label">Min:</span> {this.state.apparentTemperatureMin}</li>
				<li className="max_temp"><span className="label">Max:</span> {this.state.apparentTemperatureMax}</li>
				<li className="rain_chance"><span className="label">Rain chance:</span> {this.state.precipProbability}</li>
				<li className="wind_direction"><span className="label">Wind dir:</span> {this.state.windBearing}</li>
				<li className="wind_speed"><span className="label">Wind speed:</span> {this.state.windSpeed}</li>
			</ul>);
		} else {
			return (<ul>
				<li className="summary">{this.state.summary}</li>
				<li className="icon">{iconToEmoji(this.state.icon)}</li>
				<li className="temp"><span className="label">Temp:</span> {Math.round(this.state.apparentTemperature)}<span className="units">{this.state.units}</span></li>
				<li className="rain_chance"><span className="label">Rain chance:</span> {this.state.precipProbability}%</li>
				<li className="wind"><span className="label">Wind:</span>
					<Wind bearing={this.state.windBearing} speed={this.state.windSpeed} />
				</li>
			</ul>);
		}
	}

}

export default WeatherUnit;
