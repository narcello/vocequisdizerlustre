import React, { Component } from 'react'
import firebase from 'firebase'
import loadGoogleMapsApi from 'load-google-maps-api'
import apiKey from './index'
import './Mapa.css'

export default class RenderMapa extends Component {
    constructor() {
        super()
        this.state = {
            coordinates: [null],
            myLatLng: { lat: -16.6806141, lng: -49.2585262 }
        }
        this.options = {
            key: apiKey
        }
        this.map = null;
        this.criaMarcadoresNoMapa = this.criaMarcadoresNoMapa.bind(this)
        this.addMarcadorNoBanco = this.addMarcadorNoBanco.bind(this)
        this.pegaLocalizacaoDoBrowser = this.pegaLocalizacaoDoBrowser.bind(this)
    }
    componentWillMount() {
        const self = this
        this.pegaLocalizacaoDoBrowser()

        let coordinates = []
        firebase.database().ref('geoLocations').once('value', (snapshot) => {
            Object.keys(snapshot.val()).map((key) =>
                coordinates.push(snapshot.val()[key].coordinates))
        }).then(() => this.setState({ coordinates })
        ).then(() => this.criaMarcadoresNoMapa())

        loadGoogleMapsApi(this.options).then(function (googleMaps) {
            self.map = new googleMaps.Map(document.querySelector('#map'), {
                center: self.state.myLatLng,
                zoom: 9,
            })
        }).catch(function (error) {
            console.error(error)
        })
    }
    pegaLocalizacaoDoBrowser = () => {
        let myLatLng = { lat: null, lng: null };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                myLatLng.lat = position.coords.latitude
                myLatLng.lng = position.coords.longitude
                this.setState({ myLatLng })
            })
        }
    }
    criaMarcadoresNoMapa = () => {
        const self = this
        this.state.coordinates.map((cordenada) => {
            return loadGoogleMapsApi(this.options).then((googleMaps) => {
                new googleMaps.Marker({
                    position: cordenada,
                    map: self.map,
                    title: 'Hi'

                })
            }).catch(function (error) {
                console.error(error)
            })
        })
    }
    addMarcadorNoBanco = () => {
        const self = this
        const myCoordinates = {
            lat: this.state.myLatLng.lat,
            lng: this.state.myLatLng.lng
        }
        const newPostKey = firebase.database().ref('geoLocations').push().key;
        firebase.database().ref('geoLocations/' + newPostKey).set({
            email: 'email',
            coordinates: myCoordinates
        }).then(() => {
            self.state.coordinates.push(myCoordinates)
            self.criaMarcadoresNoMapa()
        })
    }
    render() {
        return (
            <div id='container'>
                <div id='parteSemMapa'>
                    <button id='addMarcadorNoBancoBtn' onClick={this.addMarcadorNoBanco}>Venham tocar aqui</button>
                </div>
                <div id='map'></div>
            </div>
        )
    }
}