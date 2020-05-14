//Gateway to route requests to each service
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const AccountService = require('./AccountService');

const app = express();
const port = process.env.PORT || 5000;
const accountService = new AccountService();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(pino);

app.get('/test', (req, res) => {
    console.log('hi');
    res.send({ loginData: 'Retrieved Login Data' });
});

app.post('/register', (req, res) => {
    if (req.body && req.body.username && req.body.password && req.body.firstname && req.body.lastname) {
        accountService.registerUser(req.body, res);
    } else {
        res.send('input misssing');
    }
});

app.post('/login', (req, res) => {
    if (req.body && req.body.username && req.body.password) {
        accountService.isRegisteredUser(req.body.username, res);
    }
});

app.listen(port, () =>
    console.log(`Express server is running on localhost:${port}`)
);
