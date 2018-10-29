import React, { Component, Suspense } from 'react'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'
import loadGoogleMapsApi from 'load-google-maps-api'
import apiKey from './index'
import './Mapa.css'
import addMarcadorNoBancoSoa from './soa'
import authWithGoogle from '../auth/withGoogle'
import styleMapRetro from './styleMapRetro'
import styleMapNight from './styleMapNight'

const VISAO_RETRO_DO_MAPA = 1
// const VISAO_NOTURNA_DO_MAPA = -1

const Popup = React.lazy(() => import('./Popup'))

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
            },
            ehBrowser: false,
            tipoDeVisaoMapa: VISAO_RETRO_DO_MAPA
        }
        this.options = {
            key: apiKey
        }

        this.styleMapRetro = styleMapRetro
        this.styleMapNight = styleMapNight
        this.map = null;
        this.addMarcadorNoBancoSoa = addMarcadorNoBancoSoa;
        this.criaMarcadoresNoMapa = this.criaMarcadoresNoMapa.bind(this)
        this.addMarcadorNoBanco = this.addMarcadorNoBanco.bind(this)
        this.pegaLocalizacaoDoUsuario = this.pegaLocalizacaoDoUsuario.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this)
        this.toggleVisaoMapa = this.toggleVisaoMapa.bind(this)
        this.setTipoVisaoMapa = this.setTipoVisaoMapa.bind(this)
    }
    updateDimensions() {
        const ehBrowser = window.innerWidth > 584
        this.setState({ ehBrowser })
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    componentWillMount() {
        this.updateDimensions();
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
                styles: styleMapRetro
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
    componentForBrowser = () => {
        return (
            <div id='parteSemMapa'>
                <div id='title'>Quer Lutre na sua cidade?</div>
                <Button variant="contained"
                    color="primary"
                    id='addMarcadorNoBancoBtn'
                    onClick={this.addMarcadorNoBanco}>
                    Eu quero
                        </Button>
            </div>
        )
    }
    toggleVisaoMapa() {
        const tipoDeVisaoMapaAtual = -this.state.tipoDeVisaoMapa 
        this.setState({ tipoDeVisaoMapa: tipoDeVisaoMapaAtual});
        this.setTipoVisaoMapa(tipoDeVisaoMapaAtual)
    }
    setTipoVisaoMapa = (tipoDeVisaoMapa) => {
        const self = this
        const novoTipoVisaoMapa = tipoDeVisaoMapa === VISAO_RETRO_DO_MAPA ? this.styleMapRetro : this.styleMapNight
        loadGoogleMapsApi(this.options).then(function (googleMaps) {
            const styledMapType = new googleMaps.StyledMapType(novoTipoVisaoMapa)
            self.map.mapTypes.set('styled_map', styledMapType);
            self.map.setMapTypeId('styled_map');
        })
    }
    render() {
        return (
            <div id='container'>
                {this.state.ehBrowser && this.componentForBrowser()}
                <div id='titleMobile'>Quer Lutre na sua cidade?</div>
                <div id='divAddMarcadorNoBancoBtnMobile'>
                    <Button variant="contained"
                        color="primary"
                        id='addMarcadorNoBancoBtnMobile'
                        onClick={this.addMarcadorNoBanco}>
                        Eu quero
                </Button>
                </div>
                <div onClick={this.toggleVisaoMapa} id='toggleVisaoMapa'>
                    {this.state.tipoDeVisaoMapa === VISAO_RETRO_DO_MAPA ?
                        <i id='iconVisaoNoturna' className="fas fa-eye"></i> :
                        <i id='iconVisaoRetro' className="far fa-eye"></i>}
                </div>
                <div id='map'></div>
                {this.state.popup.showPopup ?
                    <Suspense fallback={<div></div>}>
                        <Popup
                            userName={this.state.popup.userName}
                            srcPhoto={this.state.popup.srcPhoto}
                            closePopup={this.togglePopup.bind(this)} />
                    </Suspense>
                    : null
                }
            </div>
        )
    }
}