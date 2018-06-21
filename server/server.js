var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var students = require('./routes/student.router.js');
var port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/students', students);

/** ---------- MONGOOSE ------------ **/
var mongoose = require('mongoose');
// githubusers is the name of our database
// 27017 is the default mongo port number
var databaseUrl = 'mongodb://localhost:27017/githubusers';

mongoose.connection.on('connected', function () {
    console.log('mongoose is connected!');
});

mongoose.connection.on('error', function () {
    console.log('mongoose connection failed');
});
mongoose.connect(databaseUrl);
// Eventually, the mongoose code should be in a module

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});