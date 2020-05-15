import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from "./components/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';

//list of routes for application
const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegistrationPage}/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
