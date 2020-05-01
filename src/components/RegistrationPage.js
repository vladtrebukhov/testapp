import React from 'react';
import {useHistory, useLocation} from "react-router-dom";

class RegistrationPage extends React.Component {
    constructor() {
        super();
    };

    handleSubmit(event) {
        event.preventDefault();

    }
    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <label htmlFor="first_name_input">First Name:</label>
                <input id="first_name_input"type="text" onChange={event => this.setState({first_name: event.target.value})}/>
                <label htmlFor="last_name_input">Last Name:</label>
                <input id="last_name_input"type="text" onChange={event => this.setState({last_name: event.target.value})}/>
                <label htmlFor="username_input">Username:</label>
                <input id="username_input"type="text" onChange={event => this.setState({username: event.target.value})}/>
                <label htmlFor="password_input">Password:</label>
                <input id="password_input" type="password" onChange={event => this.setState({password: event.target.value})}></input>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default RegistrationPage;
