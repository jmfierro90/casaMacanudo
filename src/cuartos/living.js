import React from 'react';
import $ from 'jquery';
import { Animated } from 'react-animated-css';

import volver from '../img/volver-btn.png'

import doorCloseSound from '../img/doorCloseSound.mp3'



class Living extends React.Component {
	

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
        <div className="text-center living">
            <div style={{position:"absolute", top:"3%", left:"0", cursor:"pointer"}} onClick={this.props.volver}>
				<span className="font-volver">volver</span>
				<img src={volver} width="65%" className="arrow-volver"></img>					
			</div>

			<iframe style={{marginTop:"7%", borderRadius:"8%"}} className="rounded" width= "52%" height="60%" allow="fullscreen; autoplay; encrypted-media" src="http://www.casamacanudo.com.ar/video/living.mp4"frameborder="0" allowfullscreen="true" msallowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowpaymentrequest="false" referrerpolicy="unsafe-url" sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups" scrolling="no"></iframe>

        </div>       
        )
	}
	
}

export default Living;

