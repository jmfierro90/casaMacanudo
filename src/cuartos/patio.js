import React from 'react';
import $ from 'jquery';
import { Animated } from 'react-animated-css';

import volver from '../img/volver-btn.png'

import doorCloseSound from '../img/doorCloseSound.mp3'


class Patio extends React.Component {
	

	constructor(props) {

		super(props);

		this.state = {
			 toolTip: true,
			 toolTipHover: true
		};

		this.handleIframeEnter = this.handleIframeEnter.bind(this)
		this.handleIframeleave = this.handleIframeleave.bind(this)

	}
	
	componentDidMount(){
		let doorCloseSfx = new Audio(doorCloseSound)
		doorCloseSfx.volume = 0.2
		doorCloseSfx.play()
	}

	handleIframeEnter(){
        this.setState({toolTip:true, toolTipHover:true})
    }

    handleIframeleave(){
        this.setState({toolTipHover:false})
    }

	render() {
		return (
			<div className="text-center patio">
				<div style={{position:"absolute", top:"3%", left:"0", cursor:"pointer"}} onClick={this.props.volver}>
					<span className="font-volver">volver</span>
					<img src={volver} width="65%" className="arrow-volver"></img>					
				</div>

				{this.state.toolTip &&
					<Animated animationIn="slideInLeft" animationOut="slideOutLeft" isVisible={this.state.toolTipHover}><div className="text-light font-brush-Tool bg-light text-dark patioToolTip p-2 rounded"> Video 360°, miralo en fullscreen!</div></Animated>
                }

				<Animated style={{width:"55%", height:"65%", position:"absolute", left:"20%", top:"8%"}} className="videoCont" animationIn="fadeIn" animationInDuration={5000} animationInDelay={500}>
					<iframe onMouseEnter={this.handleIframeEnter} onMouseLeave={this.handleIframeleave} style={{marginTop:"8%", borderRadius:"5%"}} width="100%" height="100%" src="https://www.youtube.com/embed/Q_Xr3UUTirU" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</Animated>
			</div>    
        )
	}
	
}

export default Patio;

