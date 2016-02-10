var express = require ('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');

var app = express();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client')));

app.use(passport.initialize());
app.use(passport.session())

app.use(expressSession({
    secret: 'budgeting like a boss',
    resave: false,
    saveUninitialized: false
}));



//Get all the database connection stuff then require - as if they all are here
require('./server/config/mongoose.js');

//Passport config for user authentication
var User = mongoose.model ('User'); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Get all the routes functions and pass them the variable app then run it.
require ('./server/config/routes.js')(app);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // production error handler
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });



app.listen(8000, function(){
    console.log("Listening to port 8000");
});



