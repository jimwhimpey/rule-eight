import React, { Component } from 'react';
import WeatherUnit from './WeatherUnit.js';
import superagent from 'superagent';

class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			unitsTemp: "\u00B0F",
			unitsSpeed: "mph",
			loading: true,
			latlong: props.latlong
		};
	}

	componentDidMount() {
		var component = this;
		superagent.get("http://" + window.location.host.match(/^(.+):/)[1] + ":3001/" + this.state.latlong).end(function(err, res) {
			console.log(res);
			component.setState({
				weather: res.body,
				loading: false,
				units: component.state.units
			});
		});
	}

	render() {
		if (this.state.loading) {
			return (<li>
				<h2>{this.state.name}</h2>
				<ul>
					<li>Loading</li>
				</ul>
			</li>);
		} else {
			return (<li>
				<h2>{this.state.name}</h2>
				<ul className="forecast now_and_soon">
					<li>
						<h3>Now</h3>
						<WeatherUnit data={this.state.weather.currently} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>+1hr</h3>
						<WeatherUnit data={this.state.weather.hourly.data[0]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>+2hrs</h3>
						<WeatherUnit data={this.state.weather.hourly.data[1]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>+4hrs</h3>
						<WeatherUnit data={this.state.weather.hourly.data[4]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>+8hrs</h3>
						<WeatherUnit data={this.state.weather.hourly.data[8]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
				</ul>
				<ul className="forecast later">
					<li>
						<h3>{dayToShortDay[new Date(this.state.weather.daily.data[1].time * 1000).getDay()]}</h3>
						<WeatherUnit data={this.state.weather.daily.data[1]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>{dayToShortDay[new Date(this.state.weather.daily.data[2].time * 1000).getDay()]}</h3>
						<WeatherUnit data={this.state.weather.daily.data[2]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>{dayToShortDay[new Date(this.state.weather.daily.data[3].time * 1000).getDay()]}</h3>
						<WeatherUnit data={this.state.weather.daily.data[3]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>{dayToShortDay[new Date(this.state.weather.daily.data[4].time * 1000).getDay()]}</h3>
						<WeatherUnit data={this.state.weather.daily.data[4]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
					<li>
						<h3>{dayToShortDay[new Date(this.state.weather.daily.data[5].time * 1000).getDay()]}</h3>
						<WeatherUnit data={this.state.weather.daily.data[5]} unitsTemp={this.state.unitsTemp} unitsSpeed={this.state.unitsSpeed} />
					</li>
				</ul>
			</li>);
		}
	}
}

class App extends Component {
	render() {
		return (
			<div>
				<h1>Rule Nine</h1>
				<ul>
					<Location name="San Francisco" latlong="37.757815,-122.5076401" />
				</ul>
			</div>
		);
	}
}

var dayToShortDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default App;
