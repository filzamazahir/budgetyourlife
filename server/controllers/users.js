var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model ('User');

module.exports = {

    register: function(req, res) {
        console.log('password in backend', req.body.password);
        User.register(new User({
            firstname: req.body.firstname, 
            lastname: req.body.lastname, 
            email: req.body.email, 
            username: req.body.username, 
            created_at: new Date()
        }), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration successful!'});
            });
        });
    },

    login: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return res.status(500).json({err: err});
            }
            if (!user) {
                return res.status(401).json({err: info});
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(500).json({err: 'Could not log in user'});
                }
                return res.status(200).json({status: 'Login successful!', user: user});
            });
        })(req, res, next);
    },

    logout: function(req, res) {
        req.logout();
        res.status(200).json({status: 'Bye!'});
    },


    showall: function(req, res){
        Customer.find({}, function (err, customers){
            if (err) {
                console.log ("Error: Could not retrieve data");
            }
            else {
                res.json(customers);
            }
        });
    },

    findbyname: function(req,res) {
        Customer.findOne({name: req.params.name}, function(err, customer) {
            if (err) {
                console.log("Error retreiving a customer by name");
            }
            else {
                res.json(customer);
            }
        });
    },

    create: function(req, res){
        var customer = new Customer({name: req.body.name, created_at: new Date()});
        customer.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add person");
            }
            else {
                console.log ("Customer added successfully!"); 
                res.json(data_added);
            }
            
        });
    },

    remove: function (req, res) {
        Customer.remove({_id: req.params.id}, function (err, status){
            if (err){
                console.log("Error: Could not delete");
            }
            else {
                console.log("Customer deleted successfully");
                res.end();
            }
        });
    },

    showrecent: function(req, res) {
        Customer.find({}).sort({created_at: -1}).limit(3).exec(function(err, recent_customers){
            if(err) {
                console.log('Error: Could not retrieve data');
            }
            else {
                res.json(recent_customers);
            }
        });
    }
}

