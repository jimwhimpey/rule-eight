import React, { Component } from 'react';
import WeatherUnit from './WeatherUnit.js';
import superagent from 'superagent';
import './App.css';

class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			units: "us",
			loading: true,
			latlong: props.latlong
		};
	}

	componentDidMount() {
		var component = this;
		debugger;
		superagent.get("http://" + window.location.host.match(/^(.+)\:/)[1] + ":3001/" + this.state.latlong).end(function(err, res) {
			console.log(res.body);
			component.setState({
				weather: res.body,
				loading: false
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
				<ul>
					<li>
						<h3>Currently</h3>
						<WeatherUnit data={this.state.weather.currently} />
					</li>
					<li>
						<h3>+1 hour</h3>
						<WeatherUnit data={this.state.weather.hourly.data[0]} />
					</li>
					<li>
						<h3>+2 hours</h3>
						<WeatherUnit data={this.state.weather.hourly.data[1]} />
					</li>
					<li>
						<h3>+3 hours</h3>
						<WeatherUnit data={this.state.weather.hourly.data[3]} />
					</li>
					<li>
						<h3>+4 hours</h3>
						<WeatherUnit data={this.state.weather.hourly.data[4]} />
					</li>
					<li>
						<h3>Tomorrow</h3>
						<WeatherUnit data={this.state.weather.daily.data[1]} />
					</li>
					<li>
						<h3>+2 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[2]} />
					</li>
					<li>
						<h3>+3 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[3]} />
					</li>
					<li>
						<h3>+4 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[4]} />
					</li>
					<li>
						<h3>+5 days</h3>
						<WeatherUnit data={this.state.weather.daily.data[5]} />
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
				<h1>Rule Nine Test Deploy 4</h1>
				<ul>
					<Location name="San Francisco" latlong="37.757815,-122.5076401" />
				</ul>
			</div>
		);
	}
}

export default App;
