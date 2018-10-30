import React, { Component } from 'react';
import './App.css';
import { cardPrincipal } from '../../languages/languages'
import bdbr from './bd-br.png'
import bdusa from './bd-usa.png'
import bdes from  './bd-es.png'
import bdita from  './bd-ita.png'

import { Context } from '../../languages/ProviderLang'

class Inicio extends Component {
  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <React.Fragment>
            <div className="fp-bg App-header">
              <i className="fas fa-globe-americas globo"></i>
              <div id='languagePick'>
                <h5 onClick={() => context.setCurrentLang('pt')}>
                  <img alt='flag' className="bandeiras bandeiraBrasil" src={bdbr}/>
                </h5>
                <h5 onClick={() => context.setCurrentLang('us')}>
                  <img alt='flag' className="bandeiras bandeiraUSA" src={bdusa}/>
                </h5>
                <h5 onClick={() => context.setCurrentLang('es')}>
                  <img alt='flag' className="bandeiras bandeiraEspanha" src={bdes}/>
                </h5>
                <h5 onClick={() => context.setCurrentLang('it')}>
                  <img alt='flag' className="bandeiras bandeiraItalia" src={bdita}/>
                </h5>
              </div>
              <h2>{cardPrincipal[context.lang].title}<i>lustre</i> ?</h2>
            </div>
          </React.Fragment>
        )}
      </Context.Consumer>
    );
  }
}

export default Inicio;

//  
