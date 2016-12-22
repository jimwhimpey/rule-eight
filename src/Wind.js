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
		return (<div className="inner">
			<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
				<g transform={"rotate(" + this.props.bearing + " 20 20)"}>
					<polyline fill="none" points="10,15 20,3 30,15" />
					<polyline fill="none" points="20,3 20,37" />
				</g>
			</svg>
			<div className="speed">{this.state.speed}</div>
		</div>);
	}

}

export default Wind;
