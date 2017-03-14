var express = require('express');
var _ = require('lodash');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var port = 9002;

app.get('/', function(req, res) {
    res.render('index', {});
});


io.on('connection', function(socket) {
    console.log('a user connected');


    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);

        io.emit('chat message', msg);
    });
});





http.listen(port, function() {
    console.log('Listening on ', port);
});