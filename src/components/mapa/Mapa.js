import React, { Component, Suspense, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import loadGoogleMapsApi from 'load-google-maps-api'
import apiKey from './index'
import './Mapa.css'
import { addMarcadorNoBancoSoa, pegaCordenadasSalvasNoBanco } from '../../firebase/soa'
import authWithGoogle from '../../auth/withGoogle'
import styleMapRetro from './styleMapRetro'
import styleMapNight from './styleMapNight'

import { mapa } from '../../languages/languages'
import { Context } from '../../providers/Provider'

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
            tipoDeVisaoMapa: VISAO_RETRO_DO_MAPA
        }
        this.options = {
            key: apiKey
        }

        this.map = null;
        this.styleMapRetro = styleMapRetro
        this.styleMapNight = styleMapNight
        this.addMarcadorNoBancoSoa = addMarcadorNoBancoSoa;
        this.pegaCordenadasSalvasNoBanco = pegaCordenadasSalvasNoBanco;
        this.criaMarcadoresNoMapa = this.criaMarcadoresNoMapa.bind(this)
        this.addMarcadorNoBanco = this.addMarcadorNoBanco.bind(this)
        this.pegaLocalizacaoDoUsuario = this.pegaLocalizacaoDoUsuario.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
        this.toggleVisaoMapa = this.toggleVisaoMapa.bind(this)
        this.setTipoVisaoMapa = this.setTipoVisaoMapa.bind(this)
        this.centralizarMapa = this.centralizarMapa.bind(this)
    }
    componentWillMount() {
        const self = this

        this.pegaCordenadasSalvasNoBanco()
            .then((coordinates) => this.setState({ coordinates }))
            .then(() => this.criaMarcadoresNoMapa())

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
    criaMarcadoresNoMapa = (novoMarcador) => {
        const self = this
        const marcadores = novoMarcador ? [novoMarcador] : this.state.coordinates
        marcadores.map((cordenada, idx) => {
            return loadGoogleMapsApi(this.options).then((googleMaps) => {
                setTimeout(() => {
                    new googleMaps.Marker({
                        position: {
                            lat: parseFloat(cordenada.lat),
                            lng: parseFloat(cordenada.lng)
                        },
                        animation: googleMaps.Animation.DROP,
                        map: self.map,
                        title: 'Hi'

                    })
                }, idx * 300)
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
                        this.setState({
                            cordenadasDoUsuario: {
                                lat: coordinatesBrowser.lat,
                                lng: coordinatesBrowser.lng
                            }
                        })
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
    pegaLocalizacaoDoUsuario = (callback) => {
        var geoSuccess = (position) => {
            callback({ position })
        };
        var geoErr = (err) => {
            callback(err)
        }
        navigator.geolocation.getCurrentPosition(geoSuccess, geoErr);
    }
    togglePopup() {
        if (this.state.popup.showPopup) {
            const novoMarcador = this.state.cordenadasDoUsuario
            this.centralizarMapa()
            this.criaMarcadoresNoMapa(novoMarcador)
        }

        this.setState({
            popup: {
                showPopup: !this.state.popup.showPopup
            }
        });
    }
    centralizarMapa = () => {
        const self = this
        let posUserNow
        loadGoogleMapsApi(this.options).then((googleMaps) => {
            posUserNow = new googleMaps.LatLng(
                self.state.cordenadasDoUsuario.lat,
                self.state.cordenadasDoUsuario.lng
            )
        }).then(() => {
            self.map.setZoom(15)
            self.map.setCenter(posUserNow)
        })

    }
    toggleVisaoMapa() {
        const tipoDeVisaoMapaAtual = -this.state.tipoDeVisaoMapa
        this.setState({ tipoDeVisaoMapa: tipoDeVisaoMapaAtual });
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
    componentForBrowser = (lang) => {
        return (
            <div id='parteSemMapa'>
                <div id='title'>{mapa[lang].parteSemMapa.title}</div>
                <Button variant="contained"
                    color="primary"
                    id='addMarcadorNoBancoBtn'
                    onClick={this.addMarcadorNoBanco}>
                    {mapa[lang].parteSemMapa.textBtn}
                </Button>
            </div>
        )
    }
    componentForMobile = (lang) => {
        return (
            <Fragment key='componentForMobile'>
                <div id='titleMobile'>{mapa[lang].parteSemMapa.title}</div>
                <div id='divAddMarcadorNoBancoBtnMobile'>
                    <Button variant="contained"
                        color="primary"
                        id='addMarcadorNoBancoBtnMobile'
                        onClick={this.addMarcadorNoBanco}>
                        {mapa[lang].parteSemMapa.textBtn}
                    </Button>
                </div>
            </Fragment>
        )
    }
    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <Fragment>
                        <div id='container'>
                            {
                                context.ehBrowser ?
                                    this.componentForBrowser(context.lang) :
                                    this.componentForMobile(context.lang)
                            }

                            <div onClick={this.toggleVisaoMapa} id='toggleVisaoMapa'>
                                {
                                    this.state.tipoDeVisaoMapa === VISAO_RETRO_DO_MAPA ?
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
                    </Fragment>)}
            </Context.Consumer>
        )
    }
}