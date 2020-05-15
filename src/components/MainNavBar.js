import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function MainNavBar() {
    return (
        <Navbar bg="transparent" variant="light" fixed="top">
            {/*<Navbar.Brand href="/">TestApp</Navbar.Brand>*/}
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                {/*<Nav.Link href="#pricing">Log In</Nav.Link>*/}
            </Nav>
        </Navbar>
    )
}
