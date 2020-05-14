import React from 'react';
import './css/RegistrationPage.css'
//using bcrypt for hashing passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

class RegistrationPage extends React.Component {
    constructor() {
        super();
        this.firstname = null;
        this.lastname = null;
        this.username = null;
        this.password = null;
    };

    registerUser = async(event) => {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                firstname: this.firstname,
                lastname: this.lastname,
                username: this.username,
                password: this.password})
        });
        event.preventDefault();

        return response.json();
    };

    render() {
        return (
            <div className="mainContainer">
                <form className="registrationForm" onSubmit={event => this.registerUser(event)}>
                    <label id="first_name_label" htmlFor="first_name_input">First Name:</label>
                    <input id="first_name_input"type="text" onChange={event => this.firstname = event.target.value}/>
                    <label id="last_name_label" htmlFor="last_name_input">Last Name:</label>
                    <input id="last_name_input"type="text" onChange={event => this.lastname = event.target.value}/>
                    <label id="username_label" htmlFor="username_input">Username:</label>
                    <input id="username_input"type="text" onChange={event => this.username = event.target.value}/>
                    <label id="password_label" htmlFor="password_input">Password:</label>
                    <input id="password_input" type="password" onChange={event => this.password = event.target.value}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>

        );
    }
}

export default RegistrationPage;
