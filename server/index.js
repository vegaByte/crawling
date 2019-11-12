var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');

var api = require('./routes/api.js');

var upload = multer();
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Require the Router we defined in api.js

//Use the Router on the sub route /api
app.use('/api', api);

app.listen(3000);
console.log('listen: 3000');
