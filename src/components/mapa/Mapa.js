import React, { Component } from 'react'
import firebase from 'firebase'
import loadGoogleMapsApi from 'load-google-maps-api'
import apiKey from './index'
import './Mapa.css'

class RenderMapa extends Component {
    constructor() {
        super()
        this.state = {
            teste: null
        }
    }
    componentDidMount() {
        const options = {
            key: apiKey
        }

        loadGoogleMapsApi(options).then(function (googleMaps) {
            new googleMaps.Map(document.querySelector('#map'), {
                center: {
                    lat: 40.7484405,
                    lng: -73.9944191
                },
                zoom: 12
            })
        }).catch(function (error) {
            console.error(error)
        })
    }
    render() {
        return (<div id='map'></div>)
    }
}

export default class Mapa extends React.Component {
    constructor() {
        super()
        this.state = {
            teste: null
        }
    }
    componentDidMount() {
        firebase.database().ref('geoLocations').on('value', (snapshot) => {
            this.setState({ teste: snapshot.val() });
        });
    }
    render() {
        return (
                <div id='container'>
                    <div id='ladoEsquerdo'>{this.state.teste}</div>
                    <div id='renderMapa'><RenderMapa /></div>
                </div>
        )
    }
}
