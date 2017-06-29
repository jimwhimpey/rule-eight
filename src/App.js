import React, { Component } from 'react';
import Location from './Location.js';
import superagent from 'superagent';

class App extends Component {

	/**
	 * Gets the state out of local storage and puts it into the component
	 */
	componentDidMount() {
		this.setState({
			locations: JSON.parse(localStorage.getItem('locations'))
		});
	}

	handleAddLocation(e) {

		e.preventDefault();

		var component = this;

		superagent.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + document.querySelector('input').value + "&key=AIzaSyCiWJFXf3CH8Br2ebWTfo0lgZihWk-OAiQ").end(function(err, res) {

			if (err) {
				console.error("Error", err);
				return;
			}

			// Add new location to the locations we have
			var locations = (component.state.locations) ? component.state.locations.slice() : [];
			locations.push({
				name: res.body.results[0]['address_components'][0]['long_name'] + ', ' + res.body.results[0]['address_components'][2]['short_name'],
				coords: res.body.results[0].geometry.location.lat + "," + res.body.results[0].geometry.location.lng
			});
			component.setState({locations: locations});

			// Push it to local storage
			localStorage.setItem('locations', JSON.stringify(component.state.locations));

			// Reset the field value
			document.querySelector('input').value = "";

		});
	}

	handleRemove(index) {
		var locations = this.state.locations.slice();
		locations.splice(index, 1);
		this.setState({locations: locations});
		// Push it to local storage
		// localStorage.setItem('locations', JSON.stringify(locations));
	}

	render() {

		var body = '';

		if (this.state && this.state.locations) {
			body = (<ul>
				{this.state.locations.map((function(location, i) {
					return <Location name={location.name} latlong={location.coords} index={i} key={(location.name + "_" + i)} upstreamRemove={this.handleRemove.bind(this)} />;
				}).bind(this))}
			</ul>);
		}

		return (
			<div>
				<h1>Rule Nine <span>Weather Forecasting</span></h1>
				{body}
				<div className="add-location">
					<form onSubmit={this.handleAddLocation.bind(this)}>
						<input type="text" placeholder="New location, eg. Portland" />
					</form>
				</div>
			</div>
		);
	}

}

export default App;
