import React, { Component } from 'react';
import './Home.css';
import { cardPrincipal } from '../../languages/languages'
import bdbr from '../../languages/icons/bd-br.png'
import bdusa from '../../languages/icons/bd-usa.png'
import bdes from  '../../languages/icons/bd-es.png'
import bdita from  '../../languages/icons/bd-ita.png'

import { Context } from '../../languages/ProviderLang'

class Home extends Component {
  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <React.Fragment>
            <div className="fp-bg App-header">
              <i className="fas fa-globe-americas globo"></i>
              <div id='languagePick'>
                <div onClick={() => context.setCurrentLang('pt')}>
                  <img alt='flag' className="bandeiras bandeiraBrasil" src={bdbr}/>
                </div>
                <div onClick={() => context.setCurrentLang('us')}>
                  <img alt='flag' className="bandeiras bandeiraUSA" src={bdusa}/>
                </div>
                <div onClick={() => context.setCurrentLang('es')}>
                  <img alt='flag' className="bandeiras bandeiraEspanha" src={bdes}/>
                </div>
                <div onClick={() => context.setCurrentLang('it')}>
                  <img alt='flag' className="bandeiras bandeiraItalia" src={bdita}/>
                </div>
              </div>
              <h2>{cardPrincipal[context.lang].title}<i>lustre</i> ?</h2>
            </div>
          </React.Fragment>
        )}
      </Context.Consumer>
    );
  }
}

export default Home;

//  
