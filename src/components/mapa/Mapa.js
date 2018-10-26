import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'
import loadGoogleMapsApi from 'load-google-maps-api'
import apiKey from './index'
import './Mapa.css'
import addMarcadorNoBancoSoa from './soa'
import Popup from './Popup'
import authWithGoogle from '../auth/withGoogle'

export default class RenderMapa extends Component {
    constructor() {
        super()
        this.state = {
            coordinates: [null],
            center: { lat: -16.6806141, lng: -49.2585262 },
            cordenadasDoUsuario: {
                lat: null,
                lng: null
            },
            popup: {
                showPopup: false,
                userName: null,
                srcPhoto: null
            }
        }
        this.options = {
            key: apiKey
        }
        this.addMarcadorNoBancoSoa = addMarcadorNoBancoSoa;
        this.map = null;
        this.criaMarcadoresNoMapa = this.criaMarcadoresNoMapa.bind(this)
        this.addMarcadorNoBanco = this.addMarcadorNoBanco.bind(this)
        this.pegaLocalizacaoDoUsuario = this.pegaLocalizacaoDoUsuario.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
    }
    componentWillMount() {
        const self = this

        let coordinates = []
        firebase.database().ref('geoLocations').once('value', (snapshot) => {
            Object.keys(snapshot.val()).map((key) =>
                coordinates.push(snapshot.val()[key].coordinates))
        }).then(() => this.setState({ coordinates })
        ).then(() => this.criaMarcadoresNoMapa())

        loadGoogleMapsApi(this.options).then(function (googleMaps) {
            self.map = new googleMaps.Map(document.querySelector('#map'), {
                center: self.state.center,
                zoom: 9,
                disableDefaultUI: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: googleMaps.ControlPosition.RIGHT_CENTER
                },
            })
        }).catch(function (error) {
            console.error(error)
        })
    }
    pegaLocalizacaoDoUsuario = (callback) => {
        var geoSuccess = (position) => {
            callback({ position })
        };
        var geoErr = (err) => {
            callback(err)
        }
        navigator.geolocation.getCurrentPosition(geoSuccess, geoErr);
    }
    criaMarcadoresNoMapa = () => {
        const self = this
        this.state.coordinates.map((cordenada) => {
            return loadGoogleMapsApi(this.options).then((googleMaps) => {
                new googleMaps.Marker({
                    position: {
                        lat: parseFloat(cordenada.lat),
                        lng: parseFloat(cordenada.lng)
                    },
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
        this.pegaLocalizacaoDoUsuario((res) => {
            if (res.position) {
                const coordinatesBrowser = {
                    lat: res.position.coords.latitude,
                    lng: res.position.coords.longitude
                }
                authWithGoogle((res) => {
                    if (res.uid) {
                        this.addMarcadorNoBancoSoa(res.uid, coordinatesBrowser)
                        self.state.coordinates.push(coordinatesBrowser)
                        self.criaMarcadoresNoMapa()
                        this.setState({
                            popup: {
                                showPopup: !this.state.showPopup,
                                userName: res.displayName,
                                srcPhoto: res.photoURL
                            }
                        })
                    }
                })
            }
        })
    }
    togglePopup() {
        this.setState({
            popup: {
                showPopup: !this.state.popup.showPopup
            }
        });
    }
    render() {
        return (
            <div id='container'>
                <div id='parteSemMapa'>
                    <div id='title'>Quer Lutre na sua cidade?</div>
                    <Button variant="contained"
                        color="primary"
                        id='addMarcadorNoBancoBtn'
                        onClick={this.addMarcadorNoBanco}>
                        <div id="someAparece">Quer Lutre na sua cidade? </div> Eu quero
                    </Button>
                </div>
                <div id='map'></div>
                {this.state.popup.showPopup ?
                    <Popup
                        userName={this.state.popup.userName}
                        srcPhoto={this.state.popup.srcPhoto}
                        closePopup={this.togglePopup.bind(this)} />
                    : null
                }
            </div>
        )
    }
}