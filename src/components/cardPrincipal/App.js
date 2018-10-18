import React, { Component } from 'react';
import capa from './capa.jpg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import Bio from '../bio/Bio'
import Albuns from '../albuns/Albuns'
import Rider from '../rider/Rider'

import './App.css';

library.add(fab, fas, faTwitter)

class App extends Component {
  constructor(props) {
    super(props);
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }
  mouseEnter(e) {
    const links = document.querySelectorAll(".menu a");

    if (!e.target.classList.contains("active")) {
      for (let i = 0; i < links.length; i++) {
        if (links[i].classList.contains("active")) {
          links[i].classList.remove("active");
        }
        links[i].style.opacity = "0.25";
      }

      e.target.classList.add("active");
      e.target.style.opacity = "1";
      
      for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", this.mouseEnter);
      }
    }
  }
  mouseLeave() {
    const links = document.querySelectorAll(".menu a");
    for (let i = 0; i < links.length; i++) {
      links[i].style.opacity = "1";
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h2>Você quis dizer: <i>lustre</i> ?</h2>
          <img src={capa} alt='down' id='capa'></img>
          <div id='bottom-card'>
            <div class='menu'>
              <a onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} id='bio' href='#bioComponent'>Bio</a>
              <a onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} id='albuns' href='#albunsComponent'>Albuns</a>
              <a onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} id='rider' href='#riderComponent'>Rider</a>
            </div>
            <i class="material-icons"></i>
          </div>
        </header>
        <a id='bioComponent'><Bio /></a>
        <a id='albunsComponent'><Albuns /></a>
        <a id='riderComponent'><Rider /></a>
      </div>
    );
  }
}

export default App;
