import React from 'react';
import './css/LoginPage.css';
import MainNavBar from './MainNavBar';
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import UserService from "../UserService";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.username = null;
        this.password = null;
        this.state = {
            loginError: null,
            errorMessage: null
        };
    }

    showError = () => {
        setTimeout(() => {
            this.setState({loginError: false})
        }, 2500);
        return <div className="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>
    };

    performLogin = async (username, password, event) => {
        event.preventDefault();
        if (!username || !password) {
           this.setState({
               loginError: true,
               errorMessage: 'Please check your username and password'
           });
        } else {
            let userData = await new UserService().validateCredentialsAndLogin(username, password);
            if (userData['wrongPassword']) {
                this.setState({
                    loginError: true,
                    errorMessage: 'Password is incorrect.'
                });
            } else if (userData['userDoesNotExist']) {
                this.setState({
                    loginError: true,
                    errorMessage: 'User does not exist.'
                });
            } else {
                console.log('Welcome')
            }
        }
    };

    render() {
        return (
            <div>
                <MainNavBar/>
                <div className="mainContainer">
                    <Card style={{width: '25rem'}}>
                        {this.state.loginError ? this.showError(): null}
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Login</Card.Title>
                            <Form onSubmit={event => this.performLogin(this.username, this.password, event)}>
                                <Form.Group controlId="formUsername">
                                    <Form.Control type="text" placeholder="Username" onChange={event => this.username = event.target.value}/>
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




