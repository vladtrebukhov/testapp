//Gateway to route requests to each service
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const AccountService = require('./account_service');

const app = express();
const port = process.env.PORT || 5000;
const accountService = new AccountService();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(pino);

app.get('/test', (req, res) => {
    res.send({ loginData: 'Retrieved Login Data' });
});

app.post('/register', (req, res) => {
    accountService.registerUser(req.body, res);
});

app.post('/checkregistration', (req, res) => {
    accountService.isRegisteredUser(req.body.username, res);
});

app.post('/login', (req, res) => {
        accountService.login(req.body.username, req.body.password, res);
});

app.listen(port, () =>
    console.log(`Express server is running on localhost:${port}`)
);
