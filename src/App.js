import React, { Component } from 'react';
import WeatherUnit from './WeatherUnit.js';
import superagent from 'superagent';

class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			units: "\u00B0F",
			loading: true,
			latlong: props.latlong
		};
	}

	componentDidMount() {
		var component = this;
		console.log(component);
		superagent.get("http://" + window.location.host.match(/^(.+):/)[1] + ":3001/" + this.state.latlong).end(function(err, res) {
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
				<ul className="now_and_soon">
					<li>
						<h3>Now</h3>
						<WeatherUnit data={this.state.weather.currently} units={this.state.units} />
					</li>
					<li>
						<h3>+1hr</h3>
						<WeatherUnit data={this.state.weather.hourly.data[0]} units={this.state.units} />
					</li>
					<li>
						<h3>+2hrs</h3>
						<WeatherUnit data={this.state.weather.hourly.data[1]} units={this.state.units} />
					</li>
					<li>
						<h3>+4hrs</h3>
						<WeatherUnit data={this.state.weather.hourly.data[4]} units={this.state.units} />
					</li>
					<li>
						<h3>+8hrs</h3>
						<WeatherUnit data={this.state.weather.hourly.data[8]} units={this.state.units} />
					</li>
				</ul>
				<ul className="later">
					<li>
						<h3>Tomorrow</h3>
						<WeatherUnit data={this.state.weather.daily.data[1]} units={this.state.units} />
					</li>
					<li>
						<h3>+2 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[2]} units={this.state.units} />
					</li>
					<li>
						<h3>+3 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[3]} units={this.state.units} />
					</li>
					<li>
						<h3>+4 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[4]} units={this.state.units} />
					</li>
					<li>
						<h3>+5 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[5]} units={this.state.units} />
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

export default App;
