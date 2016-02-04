var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

//Connect to this database
mongoose.connect('mongodb://localhost/store_db');

//Reads all the models from the models folder - as if all stuff is here, and runs require for each file
var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        require(models_path + '/' + file);
    }
});

// Above code from models_path declaration is same as just writing this below.
// require('../models/people.js');