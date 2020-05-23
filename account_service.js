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

    login = (username, password, callback) => {
        this.usersRef.on('value', (snapshot) => {
            let dbUserData = snapshot.val();
            if (!dbUserData[username]) {
                callback.send({userDoesNotExist: true});
            } else if (dbUserData[username] && dbUserData[username]['password'] !== password){
                callback.send({wrongPassword: true})
            } else {
                callback.send(true);
            }
        });
    };

    isRegisteredUser = (username, callback) => {
        this.usersRef.once('value', (snapshot) => {
            let dbUserData = snapshot.val();
            let isRegistered = dbUserData[username] ? true : false;
            isRegistered ? callback.send(true) : callback.send(false);
        });
    };

    registerUser = (userData, callback) => {
            //snapshot is the current state of the database
            this.usersRef.once('value', (snapshot) => {
                firebase.database().ref('users/' + userData.username).set({
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    email: userData.email,
                    password: userData.password
                }).then(() => callback.send({response: 'Successfully registered!'}));
            })
        }
};




