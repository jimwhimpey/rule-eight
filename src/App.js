import React, { Component } from 'react';
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
		superagent.get("http://localhost:3001/" + this.state.latlong).end(function(err, res) {
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
					<li>Currently: {this.state.weather.currently.apparentTemperature}</li>
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
