const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase/app');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    databaseURL: `ws://localhost:5555`,
});

exports.httpsbasico = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, cache-control");

    res.status(200).send('httpsbasico');
});

exports.addMarcadorViaHttps = functions.https.onRequest((req, res) => {
    console.log('addMarcadorViaHttpsFORA')
    return new Promise((resolve, reject) => {
        admin.database().ref(`/geoLocations/5tZ2LcSITyZ5qNQTA2UmoJSSkQ32`).once('value', (snap) => {
            console.log(snap.val())
            res.set('Access-Control-Allow-Origin', '*');
            res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, cache-control");

            res.status(200).send('addMarcadorViaHttps');
            resolve(snap.val())
        }).catch((err) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, cache-control");

            console.log(err)
            res.status(500).send(err);
            reject(err)
        });
    })
});






exports.createProfile = functions.auth.user().onCreate((user) => {
    admin.database().ref(`/user/${user.uid}`).set({
        nome: user.displayName,
        email: user.email,
    });

    return sendWelcomeEmail(user.email, user.displayName);
});

const APP_NAME = 'Site da Lutre';
// const user = functions.config().lutre.user;
// const pass = functions.config().lutre.pass;
const user = ''
const pass = ''
const mailTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: user,
        pass: pass,
    },
}));

function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Olá ${displayName || ''}! Bem vindo(a) ao ${APP_NAME}. 
                        Quando marcarmos show na sua cidade avisaremos aqui no seu email.`;
    return mailTransport.sendMail(mailOptions)
}