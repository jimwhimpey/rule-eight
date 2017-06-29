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
		props.data.unitsTemp = props.unitsTemp;
		props.data.unitsSpeed = props.unitsSpeed;
		this.state = props.data;
	}

	render() {
		if (this.state.apparentTemperatureMin && this.state.apparentTemperatureMax) {
			return (<ul>
				<li className="summary">{this.state.summary}</li>
				<li className="icon">{iconToEmoji(this.state.icon)}</li>
				<li className="temp temp_max"><span className="label">Max:</span> {Math.round(this.state.apparentTemperatureMax)}<span className="units">{this.state.unitsTemp}</span></li>
				<li className="temp temp_min"><span className="label">Min:</span> {Math.round(this.state.apparentTemperatureMin)}<span className="units">{this.state.unitsTemp}</span></li>
				<li className="rain_chance" style={{opacity: Math.max(0.2, Math.round(this.state.precipProbability * 100) / 100)}}><span className="label">Rain chance:</span> {Math.round(this.state.precipProbability * 100)}%</li>
				<li className="wind"><span className="label">Wind:</span>
					<Wind bearing={this.state.windBearing} speed={this.state.windSpeed} unitsSpeed={this.state.unitsSpeed} />
				</li>
			</ul>);
		} else {
			return (<ul>
				<li className="summary">{this.state.summary}</li>
				<li className="icon">{iconToEmoji(this.state.icon)}</li>
				<li className="temp"><span className="label">Temp:</span> {Math.round(this.state.apparentTemperature)}<span className="units">{this.state.unitsTemp}</span></li>
				<li className="rain_chance" style={{opacity: Math.max(0.2, Math.round(this.state.precipProbability * 100) / 100)}}><span className="label">Rain chance:</span> {Math.round(this.state.precipProbability * 100)}%</li>
				<li className="wind"><span className="label">Wind:</span>
					<Wind bearing={this.state.windBearing} speed={this.state.windSpeed} unitsSpeed={this.state.unitsSpeed} />
				</li>
			</ul>);
		}
	}

}

export default WeatherUnit;
