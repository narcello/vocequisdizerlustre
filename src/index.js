import * as serviceWorker from './serviceWorker';
import configFirebase from './firebase/index'
import firebase from "firebase";

import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.css';

import { Provider, MIN_SIZE_DESKTOP } from './providers/Provider'

import Home from './components/home/Home';
import Bio from './components/bio/Bio';
import Albuns from './components/albuns/Albuns';
import Mapa from './components/mapa/Mapa';
import Contato from './components/contato/Contato';

firebase.initializeApp(configFirebase);

let fpapi = null
const fullpageOptions = {
    autoScrolling: true,
    parallax: true,
    normalScrollElements: "#map",
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    onLeave: function (origin, destination, direction) {
        if (destination.index === 3 && isMobile())
            fpapi.setAutoScrolling(false)
        else fpapi.setAutoScrolling(true)
    },
};

const isMobile = () => {
    return (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) < MIN_SIZE_DESKTOP
}

class Site extends React.Component {
    constructor() {
        super()
        this.state = {
            ehBrowser: false
        }
        this.updateDimensions = this.updateDimensions.bind(this)
    }
    updateDimensions() {
        const ehBrowser = !isMobile()
        this.setState({ ehBrowser })
    }
    componentWillMount() {
        this.updateDimensions()
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    render() {
        return (
            <div>
                {
                    this.state.ehBrowser ?
                        ComponentForBrowser() :
                        ComponentForMobile()
                }
            </div>
        )
    }
}

const ComponentForMobile = () => {
    return (
        <Provider>
            <div className='sectionMobile' id='incioComponent'><Home /></div>
            <div className='sectionMobile' id='bioComponent'><Bio /></div>
            {/*<div className='sectionMobile' id='albunsComponent'><Albuns /></div>*/}
            <div className='sectionMobile' id='mapaComponent'><Mapa /></div>
            <div className='sectionMobile' id='contatoComponent'><Contato /></div>
        </Provider>
    )
}

const ComponentForBrowser = () => {
    return (
        <ReactFullpage
            {...fullpageOptions}
            render={({ state, fullpageApi }) => {
                fpapi = fullpageApi
                return (
                    <ReactFullpage.Wrapper>
                        <Provider>
                            <div className='section' id='incioComponent'><Home /></div>
                            <div className='section' id='bioComponent'><Bio /></div>
                            <div className='section' id='albunsComponent'><Albuns /></div>
                            <div className='section' id='mapaComponent'><Mapa /></div>
                            <div className='section' id='contatoComponent'><Contato /></div>
                        </Provider>
                    </ReactFullpage.Wrapper>
                );
            }}
        />

    )
}

ReactDOM.render(<Site />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
