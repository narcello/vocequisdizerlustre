import * as serviceWorker from './serviceWorker';
import configFirebase from './firebase/index'
import firebase from "firebase";

import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.css';

import Inicio from './components/cardPrincipal/App';
import Bio from './components/bio/Bio';
import Albuns from './components/albuns/Albuns';
import Mapa from './components/mapa/index';
import MapaTeste from './components/mapa/Mapa';

firebase.initializeApp(configFirebase);

const fullpageOptions = {
    parallax: true,
    slidesNavigation: true,
    controlArrows: false,
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
};

class Fullpage extends React.Component {
    render() {
        return (
            <ReactFullpage
                {...fullpageOptions}
                render={({ state, fullpageApi }) => {
                    return (
                        <ReactFullpage.Wrapper className='fp-auto-height-responsive'>
                            <div className='section' id='incioComponent'><Inicio /></div>
                            <div className='section' id='bioComponent'><Bio /></div>
                            <div className='section' id='albunsComponent'><Albuns /></div>
                            <div className='section' id='riderComponent'><Mapa /></div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        )
    }
}

class Teste extends React.Component {
    render() {
        return (
            <div>
                <div className='section' id='incioComponent'><Inicio /></div>
                <div className='section' id='bioComponent'><Bio /></div>
                <div className='section' id='albunsComponent'><Albuns /></div>
                <div className='section' id='riderComponent'><MapaTeste /></div>
            </div>
        )
    }
}

ReactDOM.render(<Fullpage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
