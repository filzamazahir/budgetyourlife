var express = require ('express');
var app = express();
var path = require("path");
 


var bodyParser = require('body-parser');
app.use(bodyParser.json());  //bodyParser.urlencoded()
app.use(express.static(path.join(__dirname, './client')));

// Configuring Passport
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session())


//Get all the database connection stuff then require - as if they all are here
require('./server/config/mongoose.js');

//Get all thhe routes functions and pass them the variable app then run it.
require ('./server/config/routes.js')(app, passport);



app.listen(8000, function(){
    console.log("Listening to port 8000");
});



