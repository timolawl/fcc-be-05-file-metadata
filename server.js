'use strict';

var express = require('express'),
    multer = require('multer'),
    favicon = require('serve-favicon'),
    routes = require('./app/routes/index.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(process.cwd() + '/public'));
app.use(favicon(process.cwd() + '/public/images/favicon.ico'));

routes(app, multer);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});



