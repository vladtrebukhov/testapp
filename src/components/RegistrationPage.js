import React from 'react';
import './css/RegistrationPage.css';
import MainNavBar from './MainNavBar';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

//using bcrypt for hashing passwords - figure this out eventually
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

class RegistrationPage extends React.Component {
    constructor() {
        super();
        //need to put error in state to re-render component after setState
        this.state = {
            error: null
        };
        this.firstname = null;
        this.lastname = null;
        this.email = null;
        this.password = null;
    };

    showError = () => {
        setTimeout(() => {
            this.setState({error: false})
        }, 3000);
        return <div className="alert alert-danger text-center" role="alert">Check Your Input</div>
    };

    registerUser = async(event) => {
        event.preventDefault();

        if (!this.firstname || !this.lastname || !this.email || !this.password) {
            this.setState({error: true});
            return;
        }

        console.log(this.firstname, this.lastname, this.email, this.password);
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password})
        });
        return response.json();
    };

    render() {
        return (
            <div>
                <MainNavBar/>
                <div className="mainContainer">
                    <Card style={{width: '25rem'}}>
                        {this.state.error ? this.showError(): null}
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Create An Account</Card.Title>
                            <Form onSubmit={event => this.registerUser(event)}>
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
