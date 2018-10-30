import React, { Component } from 'react';
import './App.css';
import { cardPrincipal } from '../../languages/languages'

import { Context } from '../../languages/ProviderLang'

class Inicio extends Component {
  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <React.Fragment>
            <div className="fp-bg App-header">
              <i className="fas fa-globe-americas"></i>
              <div id='earth'></div>
              <div id='languagePick'>
                <h5 onClick={() => context.setCurrentLang('pt')}>PT-BR</h5>
                <h5 onClick={() => context.setCurrentLang('us')}>US</h5>
                <h5 onClick={() => context.setCurrentLang('es')}>ES</h5>
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