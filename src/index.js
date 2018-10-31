import * as serviceWorker from './serviceWorker';
import configFirebase from './firebase/index'
import firebase from "firebase";

import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.css';

import { Provider } from './languages/ProviderLang'

import Home from './components/home/Home';
import Bio from './components/bio/Bio';
import Albuns from './components/albuns/Albuns';
import Mapa from './components/mapa/Mapa';

firebase.initializeApp(configFirebase);

let fpapi = null
const fullpageOptions = {
    autoScrolling: true,
    parallax: true,
    slidesNavigation: true,
    controlArrows: false,
    normalScrollElements: "#map",
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    onLeave: function (origin, destination, direction) {
        if (destination.index === 3 && isMobile())
            fpapi.setAutoScrolling(false)
        else fpapi.setAutoScrolling(true)
    }
};

const isMobile = () => {
    return (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) < 583
}

class Fullpage extends React.Component {
    render() {
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
                            </Provider>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        )
    }
}

ReactDOM.render(<Fullpage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
