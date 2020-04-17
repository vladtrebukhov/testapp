const firebase = require("firebase/app");
const firebaseConfig = require('./firebaseConfig');
require("firebase/auth");
require("firebase/database");

module.exports =  class AccountService {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
    }

    checkRegisteredUser = () => {
        const usersRef = this.database.ref('users');

        console.log(usersRef);
    };

    registerUser = () => {

    }
};

