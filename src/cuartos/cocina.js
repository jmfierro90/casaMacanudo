import React from 'react';
import $ from 'jquery';
import { Animated } from 'react-animated-css';

import volver from '../img/volver-btn.png'
import note from '../img/nota.png'

import doorCloseSound from '../img/doorCloseSound.mp3'





class Cocina extends React.Component {
	

	constructor(props) {

		super(props);

		this.state = {

		};

	}

	componentDidMount(){
		let doorCloseSfx = new Audio(doorCloseSound)
		doorCloseSfx.volume = 0.2
		doorCloseSfx.play()
	}
	

	render() {
		return (
			<div className="text-center cocina">
				<div style={{position:"absolute", top:"3%", left:"0", cursor:"pointer"}} onClick={this.props.volver}>
					<span className="font-volver">volver</span>
					<img src={volver} width="65%" className="arrow-volver"></img>					
				</div>

				<div>

					<img className="note" style={{cursor:"pointer", marginTop:"10%"}} src={note} id="auto" width="15%"></img>

				</div>
			</div>    
        )
	}
	
}

export default Cocina;

