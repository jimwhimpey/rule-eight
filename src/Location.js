import React, { Component } from 'react';
import superagent from 'superagent';
import WeatherUnit from './WeatherUnit.js';

var dayToShortDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			unitsTemp: "\u00B0F",
			unitsSpeed: "mph",
			loading: true,
			latlong: props.latlong,
			index: props.index
		};
		this.upstreamRemove = props.upstreamRemove;
	}

	componentDidMount() {
		var component = this;
		superagent.get("http://" + window.location.host.match(/^(.+):/)[1] + ":3001/" + this.state.latlong).end(function(err, res) {
			// console.log(res);
			component.setState({
				weather: res.body,
				loading: false,
				units: component.state.units
			});
		});
	}

	editToggle(e) {
		if (e.target.className === 'edit') {
			e.target.className = '';
		} else {
			e.target.className = 'edit';
		}
	}
	handleRemove(e) {
		// Remove this location
		this.upstreamRemove(this.state.index);
	}

	render() {

		// Build the classes this location will use
		const componentClasses = ['location'];
		if (this.state.loading) { componentClasses.push('loading'); }

		// Build this separately so we can have a single return value
		let body = null;
		if (this.state.loading) {
			body = (<div>Loading…</div>);
		} else {
			body = (<div>
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
			</div>);
		}

		return (<li className={componentClasses.join(' ')}>
			<h2 onClick={this.editToggle}>
				{this.state.name}
				<span onClick={this.handleRemove.bind(this)}>Remove</span>
			</h2>
			{body}
		</li>);

	}
}

export default Location;
