import React, { Component } from 'react';
import capa from './capa.jpg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './App.css';

library.add(fab, fas, faTwitter)

class App extends Component {
  constructor(props) {
    super(props);
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }
  mouseEnter(e) {
    const target = document.querySelector(".target");
    const links = document.querySelectorAll(".itemMenu");
    const colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];

    if (!e.target.classList.contains("active")) {
      for (let i = 0; i < links.length; i++) {
        if (links[i].classList.contains("active")) {
          links[i].classList.remove("active");
        }
        links[i].style.opacity = "0.25";
      }

      e.target.classList.add("active");
      e.target.style.opacity = "1";

      const width = e.target.getBoundingClientRect().width;
      const height = e.target.getBoundingClientRect().height;
      const left = e.target.getBoundingClientRect().left + window.pageXOffset;
      const top = e.target.getBoundingClientRect().top + window.pageYOffset;
      const color = colors[Math.floor(Math.random() * colors.length)];

      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
      target.style.borderColor = color;
      target.style.transform = "none";
      
      for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", (e) => e.preventDefault());
        links[i].addEventListener("mouseenter", this.mouseEnter);
      }
    }
  }
  mouseLeave() {
    const links = document.querySelectorAll(".itemMenu");
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
              <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} id='bio' class='itemMenu'>Bio</div>
              <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} id='albuns' class='itemMenu'>Albuns</div>
              <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} id='rider' class='itemMenu'>Rider</div>
            </div>
            <i class="material-icons"></i>

          </div>
          <span class="target"></span>
        </header>
      </div>
    );
  }
}

export default App;
