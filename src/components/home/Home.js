import React, { Component } from 'react';
import './Home.css';
import { cardPrincipal } from '../../languages/languages'
import bdbr from '../../languages/icons/bd-br.png'
import bdusa from '../../languages/icons/bd-usa.png'
import bdes from  '../../languages/icons/bd-es.png'
import bdita from  '../../languages/icons/bd-ita.png'

import { Context } from '../../providers/Provider'

class Home extends Component {
  componentDidMount(){
        setTimeout(() => {
          const globo = document.getElementById('globo').style
          const frase = document.getElementById('frasePrincipal').style
          globo.margin = '5vmin 7vmin 0 0'
          globo.opacity = 1
          frase.opacity = 1
          frase.marginTop = 0
        }, 500)
  }
  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <React.Fragment>
            <div className="App-header parallax">
              <i id='globo' className="fas fa-globe-americas"></i>
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
              <div id='frasePrincipal'>{cardPrincipal[context.lang].title}<i>lustre</i> ?</div>
            </div>
          </React.Fragment>
        )}
      </Context.Consumer>
    );
  }
}

export default Home;