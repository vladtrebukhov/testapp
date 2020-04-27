const firebase = require("firebase/app");
const firebaseConfig = require('./firebaseConfig');
require("firebase/auth");
require("firebase/database");
const User = require('./User');

module.exports =  class AccountService {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.database = firebase.database().ref();
        this.usersRef = this.database.child('users');
    }

    isRegisteredUser = (username, callback) => {
        this.usersRef.on('value', (snapshot) => {
            let dbUserData = snapshot.val();
            let isRegistered = dbUserData[username] ? true : false;

            isRegistered ? callback.send(true) : callback.send(false);
        });
    };

    registerUser = (userData, callback) => {
        //snapshot is the current state of the database
        this.usersRef.on('value', (snapshot) => {
            let dbUserData = snapshot.val();
            let isRegistered = dbUserData[userData.username] ? true : false;

            if (!isRegistered) {
                this.usersRef.child(`${userData.username}`).set({
                    password: userData.password
                }).then(() => {
                    callback.send('New user registered');
                });
            }
        });
    };

    generateUserId = () => {
        return Math.floor(Math.random() * 1000000000)
    }

};

