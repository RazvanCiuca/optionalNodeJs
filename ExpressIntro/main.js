var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var usersController = require('./usersController.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = 9001;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({
        message: 'Hello World!'
    });
});
router.get('/users', usersController.getUsers);

app.use('/', router);
app.listen(port);

console.log('Listening on ', port);