//Gateway to route requests to each service
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const AccountService = require('./AccountService');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(pino);

app.get('/test', (req, res) => {
    res.send({ loginData: 'Retrieved Login Data' });
});
app.post('/login', (req, res) => {
    if (req.body && req.body.username && req.body.password) {
        let accountService = new AccountService(req.body.username, req.body.password);
        accountService.checkRegisteredUser();
    }
});

app.post('/')
app.listen(port, () =>
    console.log(`Express server is running on localhost:${port}`)
);


const checkStatus = (res) => {
    if (res.ok) {
        return res.text();
    } else {
        throw Error(res.statusText);
    }
};
