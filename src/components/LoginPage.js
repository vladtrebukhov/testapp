import React from 'react';
import './css/LoginPage.css';
import MainNavBar from './MainNavBar';
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import APIService from "../APIService";
import {Redirect} from "react-router-dom";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.email = null;
        this.password = null;
        this.state = {
            loginError: null,
            errorMessage: null,
            redirect: null
        };
    }

    showError = () => {
        setTimeout(() => {
            this.setState({loginError: false})
        }, 2500);
        return <div className="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>
    };

    performLogin = async (email, password, event) => {
        event.preventDefault();
        if (!email || !password) {
           this.setState({
               loginError: true,
               errorMessage: 'Please check your email and password'
           });
        } else {
            let body = {email: email, password: password};
            let response = await new APIService().sendCredentialsToGateway('/login', body);
            response.code ? this.setState({loginError: true, errorMessage: response.message}) : this.setState({redirect: true});
        }
    };

    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to='/home'/> : null}
                <MainNavBar/>
                <div className="mainContainer">
                    <Card style={{width: '25rem'}}>
                        {this.state.loginError ? this.showError(): null}
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Login</Card.Title>
                            <Form onSubmit={event => this.performLogin(this.email, this.password, event)}>
                                <Form.Group controlId="formEmail">
                                    <Form.Control type="text" placeholder="Email" onChange={event => this.email = event.target.value}/>
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Control type="password" placeholder="Password" onChange={event => this.password = event.target.value}/>
                                </Form.Group>
                                <Button style={{marginTop: '10px'}}
                                        variant="outline-primary"
                                        className="" block type="submit">
                                    Submit
                                </Button>
                                <a id="registerButton" href="/register">Register</a>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
           )
    }
}




