import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inicio from './components/cardPrincipal/App';
import Rider from './components/rider/Rider';
import Bio from './components/bio/Bio';
import Albuns from './components/albuns/Albuns';
import * as serviceWorker from './serviceWorker';

import ReactFullpage from '@fullpage/react-fullpage';

const fullpageOptions = {
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
                        <ReactFullpage.Wrapper className='fp-auto-height-responsive'>
                            <div className='section' id='incioComponent'><Inicio /></div>
                            <div className='section' id='bioComponent'><Bio /></div>
                            <div className='section' id='albunsComponent'><Albuns /></div>
                            <div className='section' id='riderComponent'><Rider /></div>
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
