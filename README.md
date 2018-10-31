## Lutre's [Web Site](https://lutre.com.br/)

Site da Lutre feito com:
* [Reactjs](https://reactjs.org/)
* [Fullpage](https://alvarotrigo.com/fullPage/)

Caso você queira contribuir com o projeto, você deve fazer o fork e comentar no index.js as linhas: 

```javascript
import * as serviceWorker from './serviceWorker';
// import configFirebase from './firebase/index'
// import firebase from "firebase";

import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.css';

import { Provider } from './languages/ProviderLang'

import Home from './components/home/Home';
import Bio from './components/bio/Bio';
import Albuns from './components/albuns/Albuns';
// import Mapa from './components/mapa/Mapa';

// firebase.initializeApp(configFirebase);
```

E remover: 
```javascript
<div className='section' id='mapaComponent'><Mapa /></div>
```
