import React from 'react'

import capaCcufg from './aoVivoCCUFG_cortada.jpg'
import capaApego from './capaApego.jpg'
import capaEp from './lutreEpCapa_n.jpg'

import './Albuns.css'

const URLS = {
    URL_YOUTUBE_APEGO: 'https://www.youtube.com/watch?v=GI4LNcsm59s',
    URL_YOUTUBE_CCUFG: 'https://www.youtube.com/watch?v=1hBHt1KF8N0',
    URL_YOUTUBE_EP: 'https://www.youtube.com/watch?v=q23XioubTIs',
    URL_SPOTIFY_APEGO: 'https://open.spotify.com/album/5yqbFJmkoLe0d2HPz3Q2dT?si=HLpQYasTQkq8hFjaZTKzhg',
    URL_SPOTIFY_CCUFG: 'https://open.spotify.com/album/6J95jkR9Sx8mFMysIX6YMj?si=gYNTH_3KSlKkpmsDl0ReVA',
}
const SPOTIFY = 'SPOTIFY'
const YOUTUBE = 'YOUTUBE'


class Albuns extends React.Component {
    constructor(){
        super()
        this.abreLink = this.abreLink.bind(this)
    }
    abreLink(event) {   
        const plataforma = event.target.className.indexOf('spotify') > 0 ? SPOTIFY : YOUTUBE
        const album = event.target.parentElement.previousElementSibling.alt
        const url = `URL_${plataforma}_${album}` 
        debugger
        window.open(URLS[url], '_blank');
    }
    render() {
        return (
            <div className='albunsCapas'>
                <div className='slide'>
                    <img alt="APEGO" className='capas' id='capaApego' src={capaApego}></img>
                    <div id='iconesRedesSociais'>
                        <i onClick={this.abreLink} className="fab fa-spotify"></i>
                        <i onClick={this.abreLink} className="fab fa-youtube"></i>
                    </div>
                </div>
                <div className='slide'>
                    <img alt="CCUFG" className='capas' id='capaCcufg' src={capaCcufg}></img>
                    <div id='iconesRedesSociais'>
                        <i title='Álbum completo' onClick={this.abreLink} className="fab fa-spotify"></i>
                        <i title='Apenas uma música no Youtube. Completo no Spotify' onClick={this.abreLink} className="fab fa-youtube"></i>
                    </div>
                </div>
                <div className='slide'>
                    <img alt="EP" className='capas' id='capaEp' src={capaEp}></img>
                    <div id='iconesRedesSociais'>
                        <i onClick={this.abreLink} className="fab fa-youtube"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Albuns