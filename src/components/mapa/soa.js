import firebase from 'firebase'

const addMarcadorNoBancoSoa = (uid, coordinates) => {
    console.table({ uid, coordinates })
    firebase.database().ref('geoLocations/' + uid).set({ coordinates })
}

export default addMarcadorNoBancoSoa;