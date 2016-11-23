import React, { Component } from 'react';

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
				<li>Temp: {this.state.apparentTemperature}</li>
				<li>Rain chance: {this.state.precipProbability}</li>
				<li>Wind dir: {this.state.windBearing}</li>
				<li>Wind dir: {this.state.windSpeed}</li>
			</ul>);
		}
	}

}

export default WeatherUnit;
