import React from 'react';
import $ from 'jquery';
import { Animated } from 'react-animated-css';

import volver from '../img/volver-btn.png'

import doorCloseSound from '../img/doorCloseSound.mp3'

class PlayRoom extends React.Component {
	

	constructor(props) {

		super(props);

		this.state = {
			juego: null,
			timer: true

		};

		this.handleJuego = this.handleJuego.bind(this);
		this.handleCounter	   = this.handleCounter.bind(this)
		this.handleVolver	=this.handleVolver.bind(this)

	}

	handleVolver(){
		this.setState({timer:false})
		this.props.volver()
	}
	
	componentDidMount(){
		this.handleCounter()

		let doorCloseSfx = new Audio(doorCloseSound)
		doorCloseSfx.volume = 0.2
		doorCloseSfx.play()
	}
		
	handleJuego(e){
		if(e.target.id === "wom"){
			this.setState({juego:"wom"})
		}else if (e.target.id === "chow"){
			this.setState({juego:"chow"})
		}

	}

	handleCounter(){
		let objThis = this;
		let timeLeft = 121;
		let elem = document.getElementById('timer');

		let timerId = setInterval(countdown, 1000);
		

		function countdown() {
			if (timeLeft == 0) {
				clearTimeout(timerId);

				if(objThis.state.timer){
					timerTrigger();
				}
				
			} else {
				
				timeLeft--;

				let date = new Date(0);
				date.setSeconds(timeLeft); // specify value for SECONDS here
				let timeString = date.toISOString().substr(14, 5);

				elem.innerHTML = timeString ;
			}
		}

		function timerTrigger() {
			
			console.log(objThis.state)
			objThis.props.volver()
			objThis.setState({timer:false})
			
		}
	}

	render() {
		return (
			<div className="text-center play-room">

				<div className="tv">
					{this.state.juego === "wom" &&
					<iframe className="pl-4 pr-4 pt-3 pb-3 rounded" width="100%" height="100%" allow="fullscreen; autoplay; encrypted-media" src="https://epic-lamarr-cb2f95.netlify.app" frameborder="0" allowfullscreen="true" msallowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowpaymentrequest="false" referrerpolicy="unsafe-url" sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups" scrolling="no"></iframe>
					}

					{this.state.juego === "chow" &&
					<iframe className="pl-4 pr-4 pt-3 pb-3 rounded" width="100%" height="100%" allow="fullscreen; autoplay; encrypted-media" src="https://agitated-kepler-58e890.netlify.app/" frameborder="0" allowfullscreen="true" msallowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowpaymentrequest="false" referrerpolicy="unsafe-url" sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups" scrolling="no"></iframe>
					}

					<div className="row" style={{position:"absolute", top:"100%", left:"0", right:"0"}}>
						<div className="col-sm-6 womcont"><div  id="wom" onClick={this.handleJuego}></div></div>
	
						<div className="col-sm-6 chowcont"><div id="chow" onClick={this.handleJuego}></div></div>
	
						
					</div>
				</div>

				<div style={{position:"absolute", top:"3%", left:"0", cursor:"pointer"}} onClick={this.handleVolver}>
					
					{this.state.timer && <span id="timer" className="font-timer mt-2"></span>}
					{!this.state.timer && <span className="font-volver">volver</span>}
					<img src={volver} width="65%" className="arrow-volver"></img>
					
				</div>		

			</div>
			
			
        )
	}
	
}

export default PlayRoom;

