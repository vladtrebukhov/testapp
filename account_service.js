const firebase = require("firebase/app");
const firebaseConfig = require('./firebaseConfig');
require("firebase/auth");
require("firebase/database");

module.exports =  class AccountService {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.database = firebase.database().ref();
        this.usersRef = this.database.child('users');
    }

    login = async (userData, callback) => {
        let response;
        try {
            response = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
        } catch(error) {
            response = error;
        }
        callback.send(response);
    };

    registerUser = async (userData, callback) => {
        let response;
        try {
           response = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password);
        } catch(error) {
            response = error;
        }
        callback.send(response);
    }
};




