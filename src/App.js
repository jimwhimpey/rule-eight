import React, { Component } from 'react';
import superagent from 'superagent';
import './App.css';

class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {name: props.name};
	}

	componentDidMount() {
		var component = this;
		superagent.get("http://localhost:3001/").end(function(err, res) {
			console.log(res.body);
			component.setState({data: res});
		});
	}

	render() {
		return <h2>{this.state.name}</h2>;
	}

}

class App extends Component {
	render() {
		return (
			<div>
				<h1>Rule Nine</h1>
				<ul>
					<li><Location name="San Francisco" /></li>
				</ul>
			</div>
		);
	}
}

export default App;
