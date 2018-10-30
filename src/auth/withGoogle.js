import firebase from 'firebase'

const authWithGoogle = (callback) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // var token = result.credential.accessToken;
        var user = result.user;
        callback(user) 
    }).catch(function (error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
        callback(error)
    });
}

export default authWithGoogle;