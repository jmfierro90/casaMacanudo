import React from 'react';
import $ from 'jquery'
import { Animated } from 'react-animated-css';

import volver from '../img/volver-btn.png'
import flecha from '../img/flecha.png'

import doorCloseSound from '../img/doorCloseSound.mp3'
import pillSound from '../img/pillSound.mp3'
import cabinetSound from '../img/cabinetSound.mp3'



class Baño extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			portfolio: null,
			descrModal: false,
			timer: true
		};

		this.consultaPortfolio();

		this.consultaPortfolio = this.consultaPortfolio.bind(this)
		this.handleMirror	   = this.handleMirror.bind(this)
		this.handleDescr	   = this.handleDescr.bind(this)
		this.handleCounter	   = this.handleCounter.bind(this)
		this.mirrorAnim		   = this.mirrorAnim.bind(this)
		this.handleVolver	   = this.handleVolver.bind(this)
	}

	componentDidMount(){
		this.handleCounter();

		let doorCloseSfx = new Audio(doorCloseSound)
		doorCloseSfx.volume = 0.2
		doorCloseSfx.play()

		$(`.mirror1`).css('opacity', 1);		
	}

	handleVolver(){
		this.setState({timer:false})
		this.props.volver()
	}


	mirrorAnim(){
		
		$('.mirror').css('pointer-events', "none");
		const totalFrames = 13;
		let frameNumber = 1;

	setInterval(function() {
		
		if (frameNumber <= totalFrames) {

			$('.mirror').css('opacity', 0);
			$(`.mirror${frameNumber}`).css('opacity', 1);
			

			if (frameNumber > totalFrames) {
			frameNumber = 13;
			} else {
			frameNumber = frameNumber + 1;
			}        
		}
	  }, 1000/24);
}
	
	handleDescr(nombre, descripcion, url){
		this.setState({descrModal: true,
					   itemSeleccionado:{nombre:nombre,
										 descripcion: descripcion,
										 url:url}
					  })
		let pillSfx = new Audio(pillSound)
		pillSfx.volume = 0.6
		pillSfx.play()
	}

	async consultaPortfolio(){
		
		const axios = require('axios');
		let self = this

		try{
			const response = await axios.get('https://jtim-rest-app.herokuapp.com/projects')
			self.setState({portfolio: response.data})
			console.log(response.data)

		} catch (error){
			console.log(error)
		}

	}

	handleMirror(){
		this.mirrorAnim()
		let cabinetSfx = new Audio(cabinetSound)
		cabinetSfx.volume = 0.2
		cabinetSfx.play()
	}

	handleCounter(){
		let objThis = this;
		let timeLeft = 301;
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
			objThis.setState({timer:false})
			objThis.props.volver()
		}
	}
	
	render() {
		return (
			<div className="text-center baño">

				
				<div style={{position:"absolute", top:"3%", left:"0", cursor:"pointer"}} onClick={this.handleVolver}>
					
					{this.state.timer && <span id="timer" className="font-timer mt-2"></span>}
					{!this.state.timer && <span className="font-volver">volver</span>}
					<img src={volver} width="65%" className="arrow-volver"></img>
					
				</div>

				<div className="cabinet">
							
					{this.state.portfolio !== null &&
						this.state.portfolio.map(
							(card) =>
							
							<div className={card.img} onClick={() =>this.handleDescr(card.name, card.description, card.url)}>
								<img src={require("../img/"+card.img+".png").default} alt="Pagina"  />									
							</div>

						)
					}
				</div>

				<div id="flecha" className="shk">
						<img  src={flecha}></img>
				</div>
				
				<div className="mirror13 mirror"></div>	
				<div className="mirror12 mirror"></div>		
				<div className="mirror11 mirror"></div>		
				<div className="mirror10 mirror"></div>		
				<div className="mirror9 mirror"></div>		
				<div className="mirror8 mirror"></div>		
				<div className="mirror7 mirror"></div>		
				<div className="mirror6 mirror"></div>		
				<div className="mirror5 mirror"></div>		
				<div className="mirror4 mirror"></div>		
				<div className="mirror3 mirror"></div>		
				<div className="mirror2 mirror"></div>			
				<div id="mirror" className="mirror1 mirror" onClick={this.handleMirror}></div>

				

				{this.state.descrModal &&
					<Animated animationIn="jackInTheBox" animationOut="jackInTheBox" isVisible={this.state.descrModal}>
						<div className="bg-macanudo-1 text-light itemSeleccionado p-2 mx-auto rounded font-brush">
							
							<div>{this.state.itemSeleccionado.nombre} - {this.state.itemSeleccionado.descripcion}</div>

							<div className="row" style={{position:"absolute",top:"0",right:"2%"}}>

								<a href={this.state.itemSeleccionado.url} target="_blank" className="col-sm-6 mx-auto">
									<span class="iconify" data-icon="akar-icons:link-chain" data-inline="false" data-width="5vh"></span>
								</a>
	
								<div className="col-sm-6 mx-auto" onClick={()=>this.setState({descrModal: false})}>
									<span style={{cursor: "pointer"}} className="iconify text-light" data-icon="icomoon-free:cross" data-inline="false" data-width="4vh"></span>
								</div>
								
							</div>

							<iframe className
								title={"Sitio Web de " + this.state.itemSeleccionado.nombre}
								width="100%"
								height="85%"
								src={this.state.itemSeleccionado.url}>
							</iframe>
						</div>
					</Animated>
				}
	
			</div>
        )
	}
	
}

export default Baño;

