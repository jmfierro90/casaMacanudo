import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.css'

import CasaMacanudo from './casaMacanudo.js';
import Baño from './cuartos/baño.js'
import Living from './cuartos/living.js'
import PlayRoom from './cuartos/playRoom.js'
import Cocina from './cuartos/cocina.js'
import Patio from './cuartos/patio.js'

import doorSound from './img/doorSound.mp3'
import doorCloseSound from './img/doorCloseSound.mp3'


class Index extends React.Component {
	

	constructor(props) {

		super(props);

		this.state = {
			page: "home",
			visible: true
		};

        this.handleIrACuarto = this.handleIrACuarto.bind(this)
		this.handleVolver = this.handleVolver.bind(this)
    }

    handleIrACuarto(e){

		this.setState({visible:false})

		let doorSfx = new Audio(doorSound)
		doorSfx.volume = 0.2
		doorSfx.play()

		setTimeout(() => { 

			{e.target.id === "bañoItem" &&
			this.setState({page: "baño"})}
	
			{e.target.id === "livingItem" &&
			this.setState({page: "living"})}
			
			{e.target.id === "playRoomItem" &&
			this.setState({page: "playroom"})}
	
			{e.target.id === "cocinaItem" &&
			this.setState({page: "cocina"})}
	
			{e.target.id === "patioItem" &&
			this.setState({page: "patio"})}	
			
			
		
		}, 500);

    }

    handleVolver(){

		let openSfx = new Audio(doorSound)
		let closeSfx = new Audio(doorCloseSound)
		openSfx.volume = 0.2;
		closeSfx.volume = 0.2
		openSfx.play();

		setTimeout(() => {
			this.setState({visible:true, page: "home"});
			setTimeout(() => {
				closeSfx.play()
			}, 200);
			
		}, 500);
        	
    }

	render() {
		return (
				<div>
					{this.state.page === "home" && <CasaMacanudo visible={this.state.visible} irACuarto={this.handleIrACuarto}/>}				
					{this.state.page === "baño" && <Baño volver={this.handleVolver} />}
					{this.state.page === "living" && <Living volver={this.handleVolver} />}
					{this.state.page === "playroom" && <PlayRoom volver={this.handleVolver} />}
					{this.state.page === "cocina" && <Cocina volver={this.handleVolver} />}
					{this.state.page === "patio" && <Patio volver={this.handleVolver} />}
				</div>
				)
	}
	
}

ReactDOM.render(<Index />, document.getElementById('root'));


