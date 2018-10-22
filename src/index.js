import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inicio from './components/cardPrincipal/App';
import Bio from './components/bio/Bio';
import Albuns from './components/albuns/Albuns';
import Rider from './components/rider/Rider';
import * as serviceWorker from './serviceWorker';

import ReactFullpage from '@fullpage/react-fullpage';

const fullpageOptions = {
    resetSliders: true,
    parallax: true,
    slidesNavigation: true,
    controlArrows: false,
  };

class Fullpage extends React.Component {
    render() {
        return (
            <ReactFullpage
            {...fullpageOptions}
                render={({ state, fullpageApi }) => {
                    return (
                        <ReactFullpage.Wrapper>
                            <div className='section' id='incioComponent'><Inicio /></div>
                            <div className='section' id='bioComponent'><Bio /></div>
                            <div className='section' id='albunsComponent'><Albuns /></div>
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
