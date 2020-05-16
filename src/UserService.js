import React from 'react';

export default class UserService extends React.Component {
    constructor(props) {
        super(props);
    }
    isRegistered = async (username) => {
        let isRegistered;
        try {
            isRegistered = await this.validateUserRegistration(username);
        } catch(error) {
            console.log(error);
        }

        return isRegistered;
    };

    validateCredentialsAndLogin = async(username, password) => {
        let userValidated;
        try {
            userValidated = await this.validateUserCredentials(username, password)
        } catch(error) {
            console.log(error);
        }

        return userValidated;
    };

    validateUserCredentials = async (username, password) => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    };

    validateUserRegistration = async (username) => {
        const response = await fetch('/checkregistration', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username: username})
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    };
}
