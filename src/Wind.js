import React, { Component } from 'react';

class Wind extends Component {

	constructor(props) {
		super(props);
		this.state = {
			bearing: props.bearing,
			speed: props.speed
		};
	}

	render() {
		return (<svg width="70" height="50" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<polyline points="65 20 5 20 20 5 5 20 20 35" stroke="rgba(0,0,0,1)" strokeWidth="6" strokeLinecap="round" fill="none" strokeLinejoin="round"></polyline>
		</svg>);
	}

}

export default Wind;
