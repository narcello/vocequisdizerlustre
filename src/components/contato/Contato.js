import React from 'react'
import './Contato.css'
// import { bio } from '../../languages/languages'
import { Context } from '../../providers/Provider'


const URLS = {
    FACEBOOK: 'https://www.facebook.com/bandalutre/',
    INSTAGRAM: 'https://instagram.com/lutrelutre?utm_source=ig_profile_share&igshid=27x803luc3qg',
    SPOTIFY: 'https://open.spotify.com/artist/3ysDWgYvkUnRYR7QQIh87W?si=pdDu1wscRF6d69Vj3Z13Lw',
    YOUTUBE: 'https://www.youtube.com/channel/UCc4Y7CGgzuAkU0TND7Jccjg/videos',
    GITHUB: 'https://github.com/MarcelloVSilva',
}
const FACEBOOK = 'FACEBOOK'
const INSTAGRAM = 'INSTAGRAM'
const SPOTIFY = 'SPOTIFY'
const YOUTUBE = 'YOUTUBE'
const GITHUB = 'GITHUB'


class Contato extends React.Component {
    constructor() {
        super()
        this.abreLink = this.abreLink.bind(this)
    }
    abreLink(rede) {
        window.open(URLS[rede], '_blank');
    }
    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div id='contatoSection'>
                            <div className='divIcon' id='fb'>
                                <i onClick={()=>this.abreLink(FACEBOOK)} className="fab fa-facebook btn-social"></i>
                            </div>
                            <div className='divIcon' id='ig'>
                                <i onClick={()=>this.abreLink(INSTAGRAM)} className="fab fa-instagram btn-social"></i>
                            </div>
                            <div className='divIcon' id='sp'>
                                <i onClick={()=>this.abreLink(SPOTIFY)} className="fab fa-spotify btn-social"></i>
                            </div>
                            <div className='divIcon' id='yt'>
                                <i onClick={()=>this.abreLink(YOUTUBE)} className="fab fa-youtube btn-social"></i>
                            </div>
                            <div className='divIcon' id='gh'>
                                <i onClick={()=>this.abreLink(GITHUB)} className="fab fa-github btn-social"></i>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </Context.Consumer>
        )

    }
}

export default Contato