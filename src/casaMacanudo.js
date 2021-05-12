import React from 'react';
import { Animated } from 'react-animated-css';
import Sound from 'react-sound';

import fondo from './img/casaMacanudo.png'
import auto  from './img/auto.png'

import carSfx from './img/carSound.mp3'

import $ from 'jquery'

class CasaMacanudo extends React.Component {
	

	constructor(props) {

		super(props);

        this.state = {
            carFx : false,
            macanudoPage: false,
            tooltip:false
        };
        
        this._home = React.createRef();
        this._fondo = React.createRef();
        this.resizeObserver = null;

        this.handleCar = this.handleCar.bind(this);
        this.handleAtticEnter = this.handleAtticEnter.bind(this);
        this.handleAtticleave = this.handleAtticleave.bind(this);

    }

    componentDidMount() {
        this.resizeObserver = new ResizeObserver((entries) => {
          this.setState({homeHeight: this._fondo.current.clientHeight})
        });
    
        this.resizeObserver.observe(this._fondo.current);


        let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        console.log("VH === " + vh )
        console.log("VW === " + vw )
       
      }  

    componentWillUnmount() {

        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }
      }

    handleAtticEnter(){
        this.setState({macanudoPage:true, tooltip:true})
    }

    handleAtticleave(){
        this.setState({macanudoPage:false})
    }

    handleCar(){
        let car = $("#auto")
     
        if(car.hasClass("shake")){
            car.removeClass("shake")
            this.setState({carFx: false})
                 
           
        }else{
            car.addClass("shake");
            this.setState({carFx: true})

            setTimeout(() => {
                car.removeClass("shake")
                this.setState({carFx: false})
            }, 20000);         
        }

    }

	render() {
		return (
            <div id="casaMacanudo">

                <Animated animationOut="fadeOut"  animationOutDuration={500} isVisible={this.props.visible}>

                     <div id="background-wrap">

                        <div className="x1">
                            <div className="cloud"></div>
                        </div>

                        <div className="x2">
                            <div className="cloud"></div>
                        </div>

                        <div className="x3">
                            <div className="cloud"></div>
                        </div>

                    </div>

                    {this.state.tooltip &&
                        <Animated animationIn="slideInRight" animationOut="slideOutRight" isVisible={this.state.macanudoPage}><div className="text-light font-brush-Tool bg-macanudo-1 atticToolTip p-2 rounded"> Accede rápido a nuestros trabajos</div></Animated>
                    }

                    <div className="mx-auto w-50" id="contenedor">
                        
                        <Animated animationIn="bounceInDown" animationInDuration={1000}>

                            <img  id="fondo" ref={this._fondo} src={fondo}/>

                            <div id="home" ref={this._home} className="text-center w-100 text-light p-4" style={{height:this.state.homeHeight}}>

                                <a href="http://www.agenciamacanudo.com.ar/" target="_blank">
                                    <div id="atticItem" style={{cursor:"pointer"}} onMouseEnter={this.handleAtticEnter} onMouseLeave={this.handleAtticleave}></div>
                                </a>

                                <div id="bañoItem" className="p-4 house-item" onClick={this.props.irACuarto}>
                                    <h1 className="item">Baño</h1>
                                </div>
        
                                <div id="livingItem" className="p-4 house-item" onClick={this.props.irACuarto}>
                                    <h3 className="item">Living</h3>
                                </div>
        
                                <div id="playRoomItem" className="p-4 house-item" onClick={this.props.irACuarto}>
                                    <h1 className="item">Playroom</h1>
                                </div>
        
                                <div id="cocinaItem" className="p-4 house-item" onClick={this.props.irACuarto}>
                                    <h1 className="item mb-2 text-dark">Cocina</h1>
                                </div>
        
                                <div id="patioItem" className="p-4 house-item" onClick={this.props.irACuarto}>
                                    <h1 className="item ml-3">Patio</h1>
                                </div>


                                <div className="auto-cont">
                                    <Animated animationIn="fadeInUp" animationInDelay={1000}>
                                        <img style={{cursor:"pointer"}} onClick={this.handleCar} src={auto} id="auto" ></img>
                                    </Animated>
                                </div>
                                
                            </div>
                            
                            
                            
                        </Animated>

                        
                    </div>

                    
                    

                    {this.state.carFx &&
                    <Sound
                        url={carSfx}
                        playStatus={Sound.status.PLAYING}
                        volume={30}
                    />}
                    
                </Animated>
            </div>

               )
	}
	
}

export default CasaMacanudo;





