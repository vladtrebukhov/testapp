import React from 'react';
import './css/RegistrationPage.css';
import MainNavBar from './MainNavBar';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import APIService from "../APIService";
import { Redirect } from 'react-router-dom'

//using bcrypt for hashing passwords - figure this out eventually
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

class RegistrationPage extends React.Component {
    constructor() {
        super();
        //need to put error in state to re-render component after setState
        this.state = {
            loginError: null,
            errorMessage: null,
            redirect: null,
        };
        this.firstname = null;
        this.lastname = null;
        this.email = null;
        this.password = null;

    };

    showError = () => {
        setTimeout(() => {
            this.setState({loginError: false})
        }, 2500);
        return <div className="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>
    };

    performRegistration = async (password, email, firstname, lastname, event) => {
        event.preventDefault();
        if (!password || !firstname || !lastname || !email) {
            this.setState({
                loginError: true,
                errorMessage: 'Please fill all fields'
            });
        } else {
            let body = {firstname: firstname, lastname: lastname, email: email, password: password};
            let response = await new APIService().sendCredentialsToGateway('/register', body);
            response.code ? this.setState({loginError: true, errorMessage: response.message}) :  this.setState({redirect: true});
        }
    };

    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to='/login' /> : null}
                <MainNavBar/>
                <div className="mainContainer">
                    <Card style={{width: '25rem'}}>
                        {this.state.loginError ? this.showError(): null}
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Create An Account</Card.Title>
                            <Form onSubmit={event => this.performRegistration(this.password, this.email, this.firstname, this.lastname, event)}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control type="text" placeholder="First Name"  onChange={event => this.firstname = event.target.value}/>
                                </Form.Group>
                                <Form.Group controlId="formLastName">
                                    <Form.Control type="text" placeholder="Last Name"  onChange={event => this.lastname = event.target.value}/>
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Control type="email" placeholder="Email"  onChange={event => this.email = event.target.value}/>
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Control type="password" placeholder="Password"  onChange={event => this.password = event.target.value}/>
                                </Form.Group>
                                <Form.Text className="text-muted text-center">
                                    We'll never share your information with anyone else.
                                </Form.Text>
                                <Button style={{marginTop: '10px'}}
                                        variant="outline-primary"
                                        className="" block type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        );
    }
}

export default RegistrationPage;
