import React from 'react'
import firebase from 'firebase'

class Mapa extends React.Component {
    constructor() {
        super()
        this.state = {
            teste: null
        }
    }
    componentDidMount() {
        firebase.database().
            ref('geoLocations').on('value', (snapshot) => {
                this.setState({ teste: snapshot.val() });
            });
    }
    render() {
        return (<div>{this.state.teste}</div>)
    }
}

export default Mapa