import React from 'react'

import capaCcufg from './aoVivoCCUFG.jpg'
import capaApego from './capaApego.jpg'
import capaEp from './lutreEpCapa_n.jpg'

import './Albuns.css'

class Albuns extends React.Component {
    render() {
        return (
            <div className='albunsCapas'>
                <div className='slide'>
                <img alt="Apego" className='capas' id='capaApego' src={capaApego}></img>
                </div>
                <div className='slide'>
                    <img alt="CCUFG" className='capas' id='capaCcufg' src={capaCcufg}></img>
                </div>
                <div className='slide'>
                    <img alt="EP" className='capas' id='capaEp' src={capaEp}></img>
                </div>
            </div>
        )
    }
}

export default Albuns