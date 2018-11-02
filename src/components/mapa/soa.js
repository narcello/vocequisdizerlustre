import firebase from 'firebase'

export const addMarcadorNoBancoSoa = (uid, coordinates) => {
    firebase.database().ref('geoLocations/' + uid).set({ coordinates })
}

export const pegaCordenadasSalvasNoBanco = async () => {
    let coordinates = []
    return firebase.database().ref('geoLocations').once('value', (snapshot) => {
        if (snapshot.val())
            Object.keys(snapshot.val()).map((key) =>
                coordinates.push(snapshot.val()[key].coordinates))
    }).then(() => coordinates)
}