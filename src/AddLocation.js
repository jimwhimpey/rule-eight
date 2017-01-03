import React, { Component } from 'react';

class AddLocation extends Component {

	render() {
		return (<div className="add-location">
			<p className="label"><label>Add a location</label></p>
			<p className="form">
				<input type="text" />
				<button>Add</button>
			</p>
		</div>);
	}

}

export default AddLocation;
