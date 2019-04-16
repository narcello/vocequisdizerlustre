# [Lutre's Web Site](https://lutre.com.br/)

Site da Lutre feito com:
* [Reactjs](https://reactjs.org/)
* [Fullpage](https://alvarotrigo.com/fullPage/)

## Contribuições

Caso você queira contribuir com o projeto faça o seguinte:
* Você deve fazer o fork

* npm install dentro do projeto

* Comente as linhas a seguir:
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

* Remova: 
```javascript
<div className='section' id='mapaComponent'><Mapa /></div>
```

* rÃn
```bash
npm start
```
* Depois que tiver modificado, me faça um pull-request.

TESTE .gitattributes

