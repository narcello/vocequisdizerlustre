import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import React, { Component } from 'react'
import firebase from 'firebase'

export default class Mapa extends Component {
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
            <div className='Mapa'>
                {this.state.teste}
                <Map google={this.props.google} zoom={14}>

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>teste</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}
