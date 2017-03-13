const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyDTVgBctf_t-M7JtjJpHC0ld4cqQ-HID5s",
    authDomain: "project2-3aaef.firebaseapp.com",
    databaseURL: "https://project2-3aaef.firebaseio.com",
    storageBucket: "project2-3aaef.appspot.com",
    messagingSenderId: "656136984384"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = firebaseApp