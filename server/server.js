/* jshint node: true */
'use strict';

var port = process.argv[2] || 8000;
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/../bower_components'));
app.use(express.static(__dirname + '/../client'));

http.listen(port, function () {
    console.log('Started web server on port ' + port);
});
